import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/app/views/admin/log/log.service'

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
  
})
export class LogComponent implements OnInit {

  storingLocations: any[] = [];
  spatialCorrelations: any[] = [];

  constructor(private logService: LogService) {}
  
  onChange(changeEvent: boolean, idx: number): void {
    console.log(changeEvent, idx);
  }

  ngOnInit(): void {
    // Fetch logs from the LogService
    this.storingLocations = this.logService.getStoringLocations();
    this.spatialCorrelations = this.logService.getSpatialCorrelations();
  }

  // Method to download logs as CSV
  downloadLogsAsCSV(): void {
    const csvData = this.generateCSV();
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'logs.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // Method to generate CSV format data
  generateCSV(): string {
    const csvRows: string[] = [];

    // Add headers
    csvRows.push('Location,Correlations');

    // Add storing locations and spatial correlations to the CSV
    this.spatialCorrelations.forEach((correlation) => {
      const row = `${correlation.location},"${correlation.correlations.join(', ')}"`;
      csvRows.push(row);
    });

    return csvRows.join('\n');
  }
}
