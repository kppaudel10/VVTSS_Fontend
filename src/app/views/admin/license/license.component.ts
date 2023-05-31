import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../admin.service";
import {NotificationService} from "../../../baseService/notification.service";

@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.scss']
})
export class LicenseComponent implements OnInit {

  public form: FormGroup | any;
  public searchForm: FormGroup | any;
  public licenseList: any[] | undefined;

  constructor(private formBuilder: FormBuilder,
              private adminService: AdminService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    // show license list
    this.getAndShowLicenseList();

    console.log("licenseList", this.licenseList)
    this.form = this.formBuilder.group({
      citizenshipNo: ['', Validators.required],
      licenseCategory: ['', Validators.required],
      validDate: ['', Validators.required],
      district: ['', Validators.required],
    });

    this.searchForm = this.formBuilder.group({
      searchValue: ['', Validators.required]
    });
  }

  saveLicenseDetail() {
    if (this.form?.invalid) {
      this.notificationService.showWarnig('Please check each field before submit.', 'Warning !!');
      return;
    }

    let data = this.form.getRawValue();
    console.log("licenseData", data)
    this.adminService.saveLicense(data).subscribe(
      (response: any) => {
        // Handle successful form submission
        Object.keys(this.form.controls).forEach((controlName) => {
          this.form.controls[controlName].setValue(null);
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

  getAndShowLicenseList() {
    this.adminService.getLicenseDetailList()
      .subscribe(
        (response: any) => {
          this.licenseList = response.data;
        },
        error => {
          console.error(error);
        }
      );
  }

  getSearchLicense() {
    let searchData = this.searchForm.getRawValue();
    if (searchData['searchValue'].length > 0) {
      this.adminService.getSearchLicense(searchData['searchValue']).subscribe(
        (response: any) => {
          this.licenseList = response.data;
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  searchFieldValueCheck(searchValue: string) {
    if (searchValue === '') {
      this.ngOnInit();
    }
  }

  getVehicleTypeName(typeInt: any) {
    if (typeInt === "0" || typeInt === 0) {
      return "Scooter";
    } else if (typeInt === "1" || typeInt === 1) {
      return "Bike";
    } else if (typeInt === "2" || typeInt === 2) {
      return "Car";
    } else {
      return "";
    }

  }

}


