import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from '../admin.service';
import {NotificationService} from 'src/app/baseService/notification.service';
import {UserDataService} from '../../publicuser/user-request/user.data.service';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-number-plate-scan',
  templateUrl: './number-plate-scan.component.html',
  styleUrls: ['./number-plate-scan.component.scss']
})
export class NumberPlateScanComponent implements OnInit {
  uploadForm!: FormGroup;
  selectedImageSrc!: string;
  public selectedImageName: string | undefined;
  public isPictureShowUpVisible: boolean = false;
  public ocrResponse: any;
  public isOnlyOcrTextModalVisible = false;
  public ocrText : string | undefined;

  constructor(private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private adminService: AdminService,
              private userDataService: UserDataService,
              private router: Router,
              private cdr: MatSnackBar,) {
  }

  ngOnInit(): void {
    // Initialize the reactive form
    this.uploadForm = this.formBuilder.group({
      scanImage: ['', Validators.required]
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

      this.uploadForm.controls['scanImage'].patchValue([file])
      this.uploadForm.get('scanImage')?.updateValueAndValidity();
    }
  }

  handlePictureVisibleModal(event: any) {
    this.isPictureShowUpVisible = event;
  }

  openImageDisplayModal(selectedImageKey: string) {
    this.selectedImageSrc = selectedImageKey;
    console.log("selectedImageKey", selectedImageKey)
    if (selectedImageKey === 'numberpate') {
      this.selectedImageName = "number plate"
    }
    this.isPictureShowUpVisible = true;
  }

  handleOnlyOcrModal(event: any) {
    this.isOnlyOcrTextModalVisible = event;
  }

  processScanImage() {
    debugger
    if (this.uploadForm?.invalid) {
      this.notificationService.showWarnig('Please choose image with contain number plate',
        'Warning !!');
      return;
    }
    let formData: any = new FormData();
    Object.keys(this.uploadForm.controls).forEach(formControlName => {
      const file: File = this.uploadForm.get(formControlName)?.value[0];
      formData.append(formControlName, file);
    });

    this.adminService.scanNumberPlate(formData).subscribe(
      (response: any) => {
        debugger
        this.userDataService.setUserData(response.data);
        debugger
        if(response.data == null || response.data == undefined || response.data.userId == null){
          this.ocrText = response.data.ocrText;
          this.isOnlyOcrTextModalVisible = true;
          // this.ngOnInit();
        }else{
        this.router.navigate(['/home/plate-scan-process'])
        }
      },
      error => {
        console.error(error);
      }
    )
  }
}

