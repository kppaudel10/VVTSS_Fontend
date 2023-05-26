import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../baseService/notification.service";
import {UserService} from "../user.service";

@Component({
  selector: 'app-buy-request',
  templateUrl: './buy-request.component.html',
  styleUrls: ['./buy-request.component.scss']
})
export class BuyRequestComponent implements OnInit {

  public burRequestForm: FormGroup | any;

  constructor(private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.burRequestForm = this.formBuilder.group({
      ownerName: ['', Validators.required],
      ownerMobileNumber: ['', Validators.required],
      vehicleIdentificationNo: ['', Validators.required],
    })
  }

  public processBuyRequest() {
    if (this.burRequestForm?.invalid) {
      this.notificationService.showWarnig('Please check each field before submit the application  ',
        'Warning !!');
      return;
    }

    let data = this.burRequestForm.getRawValue();
    console.log("licenseData", data)
    this.userService.saveVehicleBuyRequest(data).subscribe(
      (response: any) => {
        // Handle successful form submission
        Object.keys(this.burRequestForm.controls).forEach((controlName) => {
          this.burRequestForm.controls[controlName].setValue(null);
        });
        this.notificationService.showSuccess(response.message, "Success !!")
        // reload the page
        this.ngOnInit();
      },
      (error: any) => {
        // Handle error during form submission
        this.notificationService.showError(error.error.message, "Error !!")
      });

  }

}
