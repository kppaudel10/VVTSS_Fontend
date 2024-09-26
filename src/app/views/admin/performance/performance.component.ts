import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { AdminService } from '../admin.service';
import { NotificationService } from 'src/app/baseService/notification.service';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  // Chart data and configuration
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    }
  };
  public lineChartType: ChartType = 'line';  // Define chart type as 'line'

  isLoading: boolean = true;  // Loading state
  errorMessage: string = '';  // Error message

  constructor(
    private adminDataService: AdminService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getTrafficPerformanceData();
  }

  getTrafficPerformanceData(): void {
    this.adminDataService.getTrafficPerformance().subscribe({
      next: (response: any) => {
        if (response.status) {
          // Set the data for the chart
          this.lineChartData.labels = response.data.map((item: any) => `Index ${item.index}`);

          this.lineChartData.datasets = [
            {
              data: response.data.map((item: any) => item.predictedTraffic),
              label: 'Predicted Traffic',
              borderColor: 'blue',
              fill: false,
              borderWidth: 2,
            },
            {
              data: response.data.map((item: any) => item.actualTraffic),
              label: 'Actual Traffic',
              borderColor: 'red',
              fill: false,
              borderWidth: 2,
            },
            {
              data: response.data.map((item: any) => item.estimateTraffic),
              label: 'Estimated Traffic',
              borderColor: 'green',
              fill: false,
              borderWidth: 2,
            },
            
          ];
          this.isLoading = false;
        } else {
          this.errorMessage = 'Failed to fetch data';
          this.isLoading = false;
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Error fetching data';
      }
    });
  }
}  