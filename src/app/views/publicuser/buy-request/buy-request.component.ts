import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../baseService/notification.service";
import {UserService} from "../user.service";
import {GlobalMethodService} from "../../global.method.service";

@Component({
  selector: 'app-buy-request',
  templateUrl: './buy-request.component.html',
  styleUrls: ['./buy-request.component.scss']
})
export class BuyRequestComponent extends GlobalMethodService implements OnInit {

  public burRequestForm: FormGroup | any;
  public userFormData: FormData | any;
  public isPinCodePopVisible = false;
  public pinCodeForm: FormGroup | any;
  public buyRequestList: string[] | any;
  

  constructor(private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private userService: UserService) {
    super();
  }

  ngOnInit(): void {
    if (!this.isPinCodePopVisible) {
      this.burRequestForm = this.formBuilder.group({
        ownerName: ['', Validators.required],
        ownerMobileNumber: ['', Validators.required],
        vehicleIdentificationNo: ['', Validators.required],
      });
      this.getBuyRequestOfLoginUser();
    }
    if (this.isPinCodePopVisible) {
      this.pinCodeForm = this.formBuilder.group({
        pinCode: ['']
      })
    }
  }

  public processBuyRequest() {
    if (this.burRequestForm?.invalid) {
      this.notificationService.showWarnig('Please check each field before submit the application  ',
        'Warning !!');
      return;
    }

    // first validate user request and send email
    let data = this.burRequestForm.getRawValue();
    this.userFormData = data;
    this.userService.validateUserAndGenerateToken(this.userFormData).subscribe(
      (response: any) => {
        // reload the page
        this.isPinCodePopVisible = true;
        this.ngOnInit();
      },
      (error: any) => {
        // Handle error during form submission
        this.notificationService.showError(error.error.message, "Error !!")
      });

  }

  validateUserPinCode() {
    debugger
    if (this.pinCodeForm?.invalid) {
      this.notificationService.showWarnig('Please enter the pin code properly.',
        'Warning !!');
      return;
    }
    debugger
    let data = this.pinCodeForm?.getRawValue();
    console.log("pincode", data)
    this.userService.validateUserPinCode(data?.pinCode)?.subscribe(
      (response: any) => {
        // if user enter the valid pin code then we need to save that user request
        this.saveBuyRequest(this.userFormData)
      },
      (error: any) => {
        // Handle error during form submission
        this.notificationService.showError(error.error.message, "Error !!")
      });
  }

  saveBuyRequest(data: any) {
    this.userService.saveVehicleBuyRequest(data).subscribe(
      (response: any) => {
        // Handle successful form submission
        Object.keys(this.burRequestForm.controls).forEach((controlName) => {
          this.burRequestForm.controls[controlName].setValue(null);
        });
        this.notificationService.showSuccess(response.message, "Success !!")
        // reload the page
        this.isPinCodePopVisible = false;
        this.ngOnInit();
      },
      (error: any) => {
        // Handle error during form submission
        this.notificationService.showError(error.error.message, "Error !!")
      });
  }

  handlePincodePopUp(event: any) {
    this.isPinCodePopVisible = event;
  }

  getBuyRequestOfLoginUser() {
    this.userService.getVehicleBuyRequestList().subscribe(
      (response: any) => {
        this.buyRequestList = response.data;
        console.log("buyRequestList", this.buyRequestList)
      },
      (error: any) => {
        // Handle error during form submission
        this.notificationService.showError(error.error.message, "Error !!")
      });
  }


}
