import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../admin.service";
import {NotificationService} from "../../../baseService/notification.service";

@Component({
  selector: 'app-blue-book',
  templateUrl: './blue-book.component.html',
  styleUrls: ['./blue-book.component.scss']
})
export class BlueBookComponent implements OnInit {

  public form: FormGroup | any;
  public searchForm: FormGroup | any;
  public blueBookList: any[] | undefined;

  constructor(private formBuilder: FormBuilder,
              private adminService: AdminService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    // show license list
    this.getAndShowBlueBookDetailList();

    this.form = this.formBuilder.group({
      citizenshipNo: ['', Validators.required],
      vehicleType: ['', Validators.required],
      vehicleIdentificationNo: ['', Validators.required],
    });

    this.searchForm = this.formBuilder.group({
      searchValue: ['', Validators.required]
    });

  }

  saveBlueBookData() {
    if (this.form?.invalid) {
      this.notificationService.showWarnig('Please check each field before submit.', 'Warning !!');
      return;
    }

    let blueBookData = this.form.getRawValue();
    // call save api
    this.adminService.saveBlueBookDetail(blueBookData).subscribe(
      (response: any) => {
        // Handle successful form submission
        Object.keys(this.form.controls).forEach((controlName) => {
          this.form.controls[controlName].setValue(null);
        });
        this.notificationService.showSuccess(response.message, "Success !!")
      },
      (error: any) => {
        // Handle error during form submission
        this.notificationService.showError(error.error.message, "Error !!")
      }
    )
  }

  getAndShowBlueBookDetailList() {
    this.adminService.getBlueBookDetailList()
      .subscribe(
        (response: any) => {
          this.blueBookList = response.data;
        },
        error => {
          console.error(error);
        }
      );
  }


  getSearchBlueBook() {
    let searchData = this.searchForm.getRawValue();
    if (searchData['searchValue'].length > 0) {
      this.adminService.searchBlueBookDetail(searchData['searchValue']).subscribe(
        (response: any) => {
          this.blueBookList = response.data;
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
