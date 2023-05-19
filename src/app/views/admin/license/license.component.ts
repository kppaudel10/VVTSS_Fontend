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

  constructor(private formBuilder: FormBuilder,
              private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      citizenshipNo: ['', Validators.required],
      validDate: ['', Validators.required],
      district: ['', Validators.required],
    });
  }

  saveLicenseDetail() {
    let data = this.form.getRawValue();
    console.log("licenseData", data)
    this.adminService.saveLicense(data).subscribe(
      (response: any) => {
        // Handle successful form submission
        console.log('respose is: ', response)
        Object.keys(this.form.controls).forEach((controlName) => {
          this.form.controls[controlName].setValue(this.form.controls.value);
        });
        // Swal.fire('sucess kyc Updated', 'success',);
        // this.route.navigate(['/home/user/update-kyc']);
      },
      (error: any) => {
        // Handle error during form submission
        console.error('error res:', error);
      });
  }

}


