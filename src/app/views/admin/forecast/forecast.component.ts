import { Component, AfterViewInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
      directionFile: [null, Validators.required],
      date: ['',[Validators.required, this.dateValidator]],
      timeInterval: [null,[Validators.required]]
    });
  }
  // Custom date validator (optional)
  dateValidator(control: any): { [key: string]: any } | null {
    const valid = /^([0-2][0-9]|(3)[0-1])\/([0][1-9]|1[0-2])\/(\d{4})$/.test(control.value);
    return valid ? null : { invalidDate: true };
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
    if (this.forecastForm?.invalid) {
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
  
    // Define custom icons for different traffic levels
    const redIcon = L.icon({
      iconUrl: '../assets/images/marker/red-marker.svg',
      iconSize: [25, 41], 
      iconAnchor: [12, 41],
      popupAnchor: [1, -34], 
    });
  
    const yellowIcon = L.icon({
      iconUrl: '../assets/images/marker/yellow-marker.svg',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  
    const greenIcon = L.icon({
      iconUrl: '../assets/images/marker/green-marker.svg',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  
    const blueIcon = L.icon({
      iconUrl: '../assets/images/marker/blue-marker.svg',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  
    // Loop through the forecast data and add location markers
    this.forecastData.forEach((location: any) => {
      const lat = parseFloat(location.latitude);
      const lon = parseFloat(location.longitude);
      const traffic = location.traffic;
  
      let selectedIcon = greenIcon; // Default to blue icon
  
      // Determine which icon to use based on traffic value
      if (traffic > 30) {
        selectedIcon = redIcon;
      } else if (traffic > 20) {
        selectedIcon = yellowIcon;
      } else if (traffic > 10) {
        selectedIcon = blueIcon;
      }
  
      // Create a marker with the selected icon
      const marker = L.marker([lat, lon], { icon: selectedIcon });
  
      marker.bindPopup(`Traffic: ${traffic}`).addTo(this.map);
    });
  }
  resetData() {
    // Reset the form fields
    this.forecastForm.reset();
  }
  
}
