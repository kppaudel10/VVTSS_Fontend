import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { NotificationService } from 'src/app/baseService/notification.service';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  // Variables for chart
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
  public lineChartType: ChartType = 'line';

  isLoading: boolean = true;  // For loading state
  errorMessage: string = '';  // For error handling

  constructor(private adminDataService: AdminService,
              private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.getTrafficPerformanceData();
  }

  getTrafficPerformanceData(): void {
    this.adminDataService.getTrafficPerformance().subscribe({
      next: (response: any) => {
        if (response.status) {
          const performanceData = response.data;

          // Extract labels and data for the chart
          this.lineChartData.labels = performanceData.map((item: any) => `Index ${item.index}`);
          
          // Prepare datasets
          this.lineChartData.datasets = [
            {
              data: performanceData.map((item: any) => item.predictedTraffic),
              label: 'Predicted Traffic',
              borderColor: 'blue',
              fill: false,
            },
            {
              data: performanceData.map((item: any) => item.estimateTraffic),
              label: 'Estimated Traffic',
              borderColor: 'green',
              fill: false,
            },
            {
              data: performanceData.map((item: any) => item.actualTraffic),
              label: 'Actual Traffic',
              borderColor: 'red',
              fill: false,
            }
          ];

          this.notificationService.showSuccess('Data fetched successfully!',"success");
        } else {
          this.errorMessage = 'Failed to fetch data.';
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Error fetching data.';
        this.notificationService.showError('Error fetching traffic data',"error");
      }
    });
  }
}
