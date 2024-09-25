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
    if (this.map) {
      this.map.remove(); // If map already initialized, remove it first.
    }

    this.map = L.map('map', {
      center: [27.7172, 85.3240],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 2,
      crossOrigin: true
    });
    tiles.addTo(this.map);
    
  }

  constructor() {}

  ngAfterViewInit(): void {
    if (this.fullScreenModal) {
        this.initMap();
        setTimeout(() => {
          this.map.invalidateSize(); // Ensure map correctly adjusts to modal size
        }, 500);
    }
  }
}
