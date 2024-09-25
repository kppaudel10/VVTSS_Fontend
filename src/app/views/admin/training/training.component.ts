import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from '../admin.service';
import { NotificationService } from 'src/app/baseService/notification.service';
import { Router } from '@angular/router';
import { LogService } from 'src/app/views/admin/log/log.service'


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  trainingDataForm: FormGroup;
  storingLocations: any[] = []; // Array for storingLocations
  spatialCorrelations: any[] = []; // Array for spatialCorrelation
  isLoading: boolean = false;

  private chunkSize: number = 3; // Number of logs to show at a time
  private currentIndex: number = 0;

  constructor(
    private adminDataService: AdminService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder,
    private logservices: LogService
  ) {
    this.trainingDataForm = this.fb.group({
      trainingDataFile: [null],
      kValue: ['']
    });
  }

  ngOnInit(): void { }

  onFileChange(event: any) {
    const trainingDataFile = event.target.files[0];
    if (trainingDataFile) {
      this.trainingDataForm.get('trainingDataFile')?.setValue(trainingDataFile);
    }
  }

  onTrain() {
    if (this.trainingDataForm.invalid) {
      this.notificationService.showError('Please provide valid inputs!', '');
      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    formData.append('trainingDataFile', this.trainingDataForm.get('trainingDataFile')?.value);
    formData.append('kValue', this.trainingDataForm.get('kValue')?.value);

    this.adminDataService.trainigDataLogs(formData).subscribe(
      (response: any) => {
        if (response.status) {
          console.log('Full response:', response);  // Log the response here
          this.storingLocations = []; // Reset storingLocations
          this.spatialCorrelations = []; // Reset spatialCorrelations

          if (response.data && response.data.logs) {
            const storingLocations = response?.data.logs.storingLocations || [];
            const spatialCorrelation = response.data.logs.spatialCorrelation || [];
            // set the log for model
            // this.loadLogsGradually(response.data.logs.storingLocations, response.data.logs.spatialCorrelation);
            this.loadLogsGradually(storingLocations, spatialCorrelation);

            // Store the logs in the service to be used in LogComponent
            this.logservices.setStoringLocations(this.storingLocations);
            this.logservices.setSpatialCorrelations(this.spatialCorrelations);
          } else {
            this.isLoading = false;
            this.notificationService.showError('Failed to fetch data!', '');
          }
        }
      },
      (error: any) => {
        this.isLoading = false;
        this.notificationService.showError(error.data.message, 'error');
      }
    );
  }

  // Method to display logs gradually
  loadLogsGradually(storingLocations: string[], spatialCorrelations: any[]) {
    this.isLoading = true;
    this.currentIndex = 0; // Reset current index

    const loadNextChunk = () => {
      // Get next chunk of storingLocations and spatialCorrelations
      const nextStoringLocations = storingLocations.slice(this.currentIndex, this.currentIndex + this.chunkSize);
      const nextSpatialCorrelations = spatialCorrelations.slice(this.currentIndex, this.currentIndex + this.chunkSize);

      // Add the chunk to the displayed list
      this.storingLocations.push(...nextStoringLocations);
      this.spatialCorrelations.push(...nextSpatialCorrelations);

      this.currentIndex += this.chunkSize;

      if (this.currentIndex < storingLocations.length || this.currentIndex < spatialCorrelations.length) {
        // If there's more data to load, continue after a short delay
        setTimeout(loadNextChunk, 1000); // Adjust the delay as needed
      } else {
        // All data loaded
        this.isLoading = false;
      }
    };

    // Start loading the first chunk
    loadNextChunk();
  }
}
