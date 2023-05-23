import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-number-plate-scan',
  templateUrl: './number-plate-scan.component.html',
  styleUrls: ['./number-plate-scan.component.scss']
})
export class NumberPlateScanComponent implements OnInit {

  public numberPlateForm: FormData | any;
  public selectedImage: File | any

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.numberPlateForm = this.formBuilder.group({
      numberPlateImage: ['']
    })
  }

  uploadImage(event: any) {
    const file: File = event.target.files[0];
    this.selectedImage = file;
    console.log("selectedImage", this.selectedImage.value[0])
    // this.numberPlateForm.controls['numberPlateImage'].patchValue([file]);
    // this.numberPlateForm.get('numberPlateImage').updateValueAndValidity()
  }

}
