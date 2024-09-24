import { Component, AfterViewInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements AfterViewInit {
  private map: any;

  @ViewChild('fullScreen') fullScreenModal: any;
  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      minZoom: 2,
    }).addTo(this.map);

    tiles.addTo(this.map);
  }

  constructor() { }

  ngAfterViewInit(): void {
    // Subscribe to the modal opening event if available
    if (this.fullScreenModal) {
          this.initMap();
          setTimeout(() => {
            this.map.invalidateSize();
          }, 500);
          // Initialize the map after the modal is open
    }
  }
}
