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

  ngOnInit(): void {
    // Fetch logs from the LogService
    this.storingLocations = this.logService.getStoringLocations();
    this.spatialCorrelations = this.logService.getSpatialCorrelations();
  }
}
