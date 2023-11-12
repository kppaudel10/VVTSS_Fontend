import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {NotificationService} from "../../../baseService/notification.service";

@Component({
  selector: 'app-process-tax',
  templateUrl: './process-tax.component.html',
  styleUrls: ['./process-tax.component.scss']
})
export class ProcessTaxComponent implements OnInit {

  public taxProcessForm: FormGroup | any;
  public taxClearanceList: any[] | undefined;
  public citizenshipNo: any;
  public vehicleIdentificationList: any[] | undefined;
  public numberPlateList: any[] | undefined;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.taxProcessForm = this.formBuilder.group({
      citizenshipNo: [''],
      vehicleType: ['', Validators.required],
      vehicleIdentificationNo: ['', Validators.required],
      numberPlate: ['', Validators.required],
      paidAmount: ['', Validators.required],
      amountPaidSheet: [null, Validators.required]
    });
    this.getLoginUserCommonData();
    this.getLoginUserTaxClearanceList();
  }

  uploadImage(event: any) {
    const file: File = event.target.files[0];
    this.taxProcessForm.controls['amountPaidSheet'].patchValue([file]);
    this.taxProcessForm.get('amountPaidSheet').updateValueAndValidity()
  }

  saveTaxClearance() {
    if (this.taxProcessForm?.invalid) {
      this.notificationService.showWarnig('Please check each field before submit the application  ',
        'Warning !!');
      return;
    }
    let formData: any = new FormData();
    Object.keys(this.taxProcessForm.controls).forEach(formControlName => {
      if (formControlName == 'amountPaidSheet') {
        const file: File = this.taxProcessForm.get(formControlName).value[0];
        formData.append(formControlName, file);
      } else {
        formData.append(formControlName, this.taxProcessForm.get(formControlName).value);
      }
    });
    this.userService.saveTaxClearance(formData).subscribe(
      (response: any) => {
        // Handle successful form submission
        console.log('respose is: ', response)
        Object.keys(this.taxProcessForm.controls).forEach((controlName) => {
          this.taxProcessForm.controls[controlName].setValue(this.taxProcessForm.controls.value);
        });
        this.notificationService.showSuccess(response.message, "Success !!")
      },
      (error: any) => {
        // Handle error during form submission
        this.notificationService.showError(error.error.message, "Error !!")
      });
    this.ngOnInit();
  }


  getLoginUserTaxClearanceList() {
    this.userService.getTaxClearanceList().subscribe(
      (res: any) => {
        console.log('taxData', res.data);
        this.taxClearanceList = res.data;
      },
      (error: any) => {
        this.notificationService.showError(error, "Error !")
      }
    )
  }

  getLoginUserCommonData() {
    this.userService.getUserCommonDetails().subscribe(
      (res: any) => {
        this.citizenshipNo = res.data.citizenshipNo;
        this.vehicleIdentificationList = res.data.vehicleIdentificationNo;
        this.numberPlateList = res.data.numberPlate;
      },
      (error: any) => {
        this.notificationService.showError(error, "Error !")
      }
    )
  }


}
