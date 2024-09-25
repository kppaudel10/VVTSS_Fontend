import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  constructor(){
    
  }

  private storingLocations: string[] = [];
  private spatialCorrelations: any[] = [];

  // Methods to get logs
  getStoringLocations() {
    return this.storingLocations;
  }

  getSpatialCorrelations() {
    return this.spatialCorrelations;
  }

  // Methods to set logs
  setStoringLocations(locations: string[]) {
    this.storingLocations = locations;
  }

  setSpatialCorrelations(correlations: any[]) {
    this.spatialCorrelations = correlations;
  }

  // Optionally, you could add a method to add logs progressively
  addLog(location: string, correlation: any) {
    this.storingLocations.push(location);
    this.spatialCorrelations.push(correlation);
  }
}
