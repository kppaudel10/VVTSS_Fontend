import { Component, AfterViewInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from '../admin.service';
import { NotificationService } from 'src/app/baseService/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements AfterViewInit {
  forecastForm: FormGroup;
  forecastData : any[] = [];
  constructor(
    private adminDataService: AdminService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.forecastForm = this.fb.group({
      directionFile: [null],
      date: [''],
      timeInterval: [null]
    });
  }
  private map: any;

  @ViewChild('fullScreen') fullScreenModal: any;

  private initMap(): void {
    if (this.map) {
      this.map.remove(); // If map already initialized, remove it first.
    }

    this.map = L.map('map', {
      center: [27.7172, 85.3240],
      zoom: 12
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 2,
      crossOrigin: true
    });
    tiles.addTo(this.map);
    
  }

  ngAfterViewInit(): void {
    if (this.fullScreenModal) {
        this.initMap();
        setTimeout(() => {
          this.map.invalidateSize(); // Ensure map correctly adjusts to modal size
        }, 500);
    }
  }

  onForecast() {
    if (this.forecastForm.invalid) {
      this.notificationService.showError('Please provide valid inputs!', '');
      return;
    }

    const formData = new FormData();
    formData.append('directionFile', this.forecastForm.get('directionFile')?.value);
    formData.append('date', this.forecastForm.get('date')?.value);
    formData.append('timeInterval', this.forecastForm.get('timeInterval')?.value);


    this.adminDataService.forecastData(formData).subscribe(
      (response: any) => {
        if (response.status) {
          this.forecastData = response.data;
          this.addMarkers();
        }
      },
      (error: any) => {
        this.notificationService.showError(error.data.message, 'error');
      }
    );
  }

  onFileChange(event: any) {
    const directionFile = event.target.files[0];
    if (directionFile) {
      this.forecastForm.get('directionFile')?.setValue(directionFile);
    }
  }

  addMarkers(): void {
    if (!this.map || !this.forecastData.length) {
      return;
    }

    // Loop through the forecast data and add markers
    this.forecastData.forEach((location: any) => {
      debugger
      const lat = parseFloat(location.latitude);
      const lon = parseFloat(location.longitude);
      const traffic = location.traffic;

      let markerColor = '';

      // Determine marker color based on traffic value
      if (traffic > 40) {
        markerColor = 'red';
      } else if (traffic > 30) {
        markerColor = 'yellow';
      } else if (traffic > 15) {
        markerColor = 'green';
      } else {
        markerColor = 'blue'; // Default color for traffic <= 15
      }

      // Create a circle marker with the determined color
      const marker = L.circleMarker([lat, lon], {
        radius: 8,
        color: markerColor,
        fillColor: markerColor,
        fillOpacity: 0.8
      });

      marker.bindPopup(`Traffic: ${traffic}`).addTo(this.map);
    });
  }
}
