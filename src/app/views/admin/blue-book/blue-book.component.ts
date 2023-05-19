import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-blue-book',
  templateUrl: './blue-book.component.html',
  styleUrls: ['./blue-book.component.scss']
})
export class BlueBookComponent implements OnInit {

  public form: FormGroup | any;

  constructor(private formBuilder: FormBuilder,
              private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      citizenshipNo: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleIdentificationNo: ['', Validators.required],
    });
  }

  saveBlueBookData() {
    let blueBookData = this.form.getRawValue();
    console.log("bluebookData", blueBookData)
    // call save api
    this.adminService.saveBlueBookDetail(blueBookData).subscribe(
      (response: any) => {
        // Handle successful form submission
        Object.keys(this.form.controls).forEach((controlName) => {
          this.form.controls[controlName].setValue(null);
        });
      },
      (error: any) => {
        // Handle error during form submission
        console.error('error res:', error);
      }
    )
  }

}
