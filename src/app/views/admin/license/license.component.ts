import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../admin.service";

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
              private adminService: AdminService) {
  }

  ngOnInit(): void {
    // show license list
    this.getAndShowLicenseList();

    console.log("licenseList", this.licenseList)
    this.form = this.formBuilder.group({
      citizenshipNo: ['', Validators.required],
      validDate: ['', Validators.required],
      district: ['', Validators.required],
    });

    this.searchForm = this.formBuilder.group({
      searchValue: ['', Validators.required]
    });
  }

  saveLicenseDetail() {
    let data = this.form.getRawValue();
    console.log("licenseData", data)
    this.adminService.saveLicense(data).subscribe(
      (response: any) => {
        // Handle successful form submission
        Object.keys(this.form.controls).forEach((controlName) => {
          this.form.controls[controlName].setValue(null);
        });
        // Swal.fire('sucess kyc Updated', 'success',);
        // this.route.navigate(['/home/user/update-kyc']);
      },
      (error: any) => {
        // Handle error during form submission
        console.error('error res:', error);
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

}


