import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../admin.data.service';
import { NotificationService } from 'src/app/baseService/notification.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  trainingDataForm: FormGroup;
  logs: string[] = [];
  isLoading: boolean = false;

  constructor(
    private adminDataService: AdminDataService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialize the form group
    this.trainingDataForm = this.fb.group({
      file: [null],
      kValue: ['']
    });
  }

  ngOnInit(): void {
    // Any initialization logic
  }

  // Method to handle file input
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.trainingDataForm.patchValue({
        file: file
      });
    }
  }

  // Method to handle Train button click
  onTrain() {
    // Ensure that the form is valid before proceeding
    if (this.trainingDataForm.invalid) {
      this.notificationService.showError('Please provide valid inputs!', '');
      return;
    }

    // Show loading indicator
    this.isLoading = true;

    // Prepare form data to send to the backend
    const formData = new FormData();
    formData.append('file', this.trainingDataForm.get('file')?.value);
    formData.append('kValue', this.trainingDataForm.get('kValue')?.value);

    this.adminDataService['trainigDataLogs'](formData).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response.status) {
          // Set logs to display in modal
          this.logs = response.data.logs.storingLocations;
        } else {
          this.notificationService.showError('Failed to fetch data!', '');
        }
      },
      (error: any) => {
        this.isLoading = false;
        this.notificationService.showError(error.data.message, 'error');
      }
    );
  }
}
