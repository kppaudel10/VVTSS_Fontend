import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-number-plate-scan',
  templateUrl: './number-plate-scan.component.html',
  styleUrls: ['./number-plate-scan.component.scss']
})
export class NumberPlateScanComponent implements OnInit {
  uploadForm!: FormGroup; 
  selectedImageSrc!: string;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the reactive form
    this.uploadForm = this.formBuilder.group({
      numberplate: [''] 
    });
  }

  onFileChange(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Read the image file using FileReader
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageSrc = e.target.result;
      };
      reader.readAsDataURL(file);
      
      this.uploadForm.patchValue({
        numberplate: file
      });
      this.uploadForm.get('numberplate')?.updateValueAndValidity();
    }
  }
}
