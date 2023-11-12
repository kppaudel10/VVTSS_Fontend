import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationService} from "../../../baseService/notification.service";
import {GlobalMethodService} from "../../global.method.service";


@Component({
  selector: 'app-user-kyc-update',
  templateUrl: './user-kyc-update.component.html',
  styleUrls: ['./user-kyc-update.component.scss']
})
export class UserKycUpdateComponent extends GlobalMethodService implements OnInit {
  public visible = false;
  public form: FormGroup | any;
  public kycDetails: any; // Variable to store KYC details
  public kycStatusTextColor: string = 'white';
  public isPictureShowUpVisible = false;
  public isKycFormClose: boolean = false;
  public isQrCodeGenerateModuleVisible = false;
  public qrCodeImage: string | any
  public downloadImageName: string | any
  public loginUserLicenseData: any[] | undefined;
  public loginBlueBookData: any[] | undefined;
  public isLicenseModalVisible = false;
  public isBlueBookModalVisible = false;
  items = [1, 2, 3, 4];
  color = ['primary', 'success', 'warning'];


  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private cdr: MatSnackBar,
              private route: Router,
              private notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      citizenshipNo: ['', Validators.required],
      profilePicture: [null, Validators.required],
      citizenshipFont: [null, Validators.required],
      citizenshipBack: [null, Validators.required]
    });
  }

  uploadImage(event: any, controlName: string) {
    const file: File = event.target.files[0];
    this.form.controls[controlName].patchValue([file]);
    this.form.get(controlName).updateValueAndValidity()
  }

  submitForm() {
    if (this.form?.invalid && !this.isKycFormClose) {
      this.notificationService.showWarnig('Please check each field before submit the application  ',
        'Warning !!');
      return;
    }
    let formData: any = new FormData();
    Object.keys(this.form.controls).forEach(formControlName => {
      if (formControlName == 'profilePicture' || formControlName === 'citizenshipFont'
        || formControlName === 'citizenshipBack') {
        const file: File = this.form.get(formControlName).value[0];
        formData.append(formControlName, file);
      } else {
        formData.append(formControlName, this.form.get(formControlName).value);
      }
    });
    this.userService.submitFor(formData).subscribe(
      (response: any) => {
        // Handle successful form submission
        console.log('respose is: ', response)
        Object.keys(this.form.controls).forEach((controlName) => {
          this.form.controls[controlName].setValue(this.form.controls.value);
        });
        this.notificationService.showSuccess(response.message, "Success !!")
        this.closeKycForm();

      },
      (error: any) => {
        // Handle error during form submission
        this.notificationService.showError(error.error.message, "Error !!")
      });

  }

  getUserBasicDetails() {

    this.userService.getKycBasicDetails().subscribe(
      (data: any) => {
        this.kycDetails = data.data; // Store the retrieved KYC details in the variable
        this.form.patchValue(this.kycDetails);
        console.log('dataxxxx', this.kycDetails);

      },
      (error: any) => {
        console.log(error);
      }
    );
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  isFormDisabled() {
    if (this.kycDetails === null || this.kycDetails === undefined) {
      return false;
    } else {
      if (this.kycDetails['isKycPending'] === true || this.kycDetails['isKycCompleted']) {
        return true;
      } else {
        return false;
      }
    }
  }

  closeKycForm() {
    this.visible = false;
    this.isKycFormClose = true;
    this.ngOnInit();
    // this.route.navigate(['/home/user/update-kyc']);
  }

  getKycStatus() {
    if (this.kycDetails === null || this.kycDetails === undefined) {
      return '';
    } else {
      if (this.kycDetails['isKycPending'] === true) {
        this.kycStatusTextColor = this.color[0];
        return "PENDING";
      } else if (this.kycDetails['isKycCompleted'] === true) {
        this.kycStatusTextColor = this.color[1];
        return "VERIFIED"
      } else if (this.kycDetails['isKycRejected'] === true) {
        this.kycStatusTextColor = this.color[2];
        return "REJECTED"
      } else {
        return '';
      }
    }
  }

  handleQrCodeChange(event: any) {
    this.isQrCodeGenerateModuleVisible = event;
  }

  handleLicenseModal(event: any) {
    this.isLicenseModalVisible = event;
  }

  handleBluebookModal(event: any) {
    this.isBlueBookModalVisible = event;
  }

  generateAndShowQrCode() {
    // fetch qr image
    this.userService.getGenerateQrCode().subscribe((response: any) => {
      // create image form blob
      this.createImageFromBlob(response.body)
    });
    this.isQrCodeGenerateModuleVisible = true;
    this.ngOnInit();
  }

  createImageFromBlob(imageData: Blob): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      // this.images[this.imageIndex++] = reader.result as string;
      this.qrCodeImage = reader.result as string;
    };
    reader.readAsDataURL(imageData);
  }

  downloadQrImage() {
    this.userService.downloadQrCodeImage().subscribe((response: any) => {
      let imageBlob = response.body as Blob;
      const downloadLink = document.createElement('a');
      const url = URL.createObjectURL(imageBlob);
      console.log("url", url)
      downloadLink.href = url;
      downloadLink.download = 'Qrcode.png'; // Set the desired filename

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);

    }, (error) => {
      console.error('API request failed:', error);
    });
  }

  getLoginUserLicenseList() {
    this.userService.getLoginUserLicense().subscribe(
      (response: any) => {
        this.loginUserLicenseData = response.data;
        console.log("loginuserdata", response.data)
      },
      (error: any) => {
        // Handle error during form submission
        this.notificationService.showError(error.error.message, "Error !!")
      });
  }

  getLoginUserBlueBook() {
    this.userService.getLoginUserBlueBook().subscribe(
      (response: any) => {
        this.loginBlueBookData = response.data;
        this.isBlueBookModalVisible = true;
        this.ngOnInit();
        console.log("loginBlueBookData", response.data)
      },
      (error: any) => {
        // Handle error during form submission
        this.notificationService.showError(error.error.message, "Error !!")
      });
  }

}
