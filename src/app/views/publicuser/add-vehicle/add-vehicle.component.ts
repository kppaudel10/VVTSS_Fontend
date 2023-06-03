import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { NotificationService } from 'src/app/baseService/notification.service';
import { GlobalMethodService } from "../../global.method.service";

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent extends GlobalMethodService implements OnInit {

  addVehicleForm: FormGroup = new FormGroup({});
  submitted = false;
  public vehicleList: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService) {
    super();
  }


  ngOnInit(): void {

    this.getAndShowVehicleList();
    this.addVehicleForm = this.formBuilder.group({
      manufactureYear: ['', Validators.required],
      vehicleType: ['', Validators.required],
      companyCode: ['', Validators.required],
      companyName: ['', Validators.required],
    });
  }


  savevehicle() {
    this.submitted = true;
    if (this.addVehicleForm?.invalid) {
      this.notificationService.showWarnig('Please check each field before submit.', 'Warning !!');
      return;
    }
    // here call save vehicle api from user Service class
    //let vehicle = this.addVehicleForm.getRawValue();
    this.userService.addNewVehicle(this.addVehicleForm?.value)?.subscribe(
      (response: any) => {
        // Handle successful form submission
        Object.keys(this.addVehicleForm.controls).forEach((controlName) => {
          this.addVehicleForm.controls[controlName].setValue(null);
        });
        this.notificationService.showSuccess(response.message, "Success !!")
        this.ngOnInit();
      },
      (error: any) => {
        // Handle error during form submission
        this.notificationService.showError(error.error.message, "Error !!")
      })
  }

  // get Vehicle List Api
  getAndShowVehicleList() {
    this.userService.getVehicleListByVendorId().subscribe(
      (response: any) => {
        this.vehicleList = response.data;
        this.totalPages = Math.ceil(this.vehicleList.length / this.itemsPerPage);
      },
      (error: any) => {
        console.error(error);
        // Handle error during form submission
        this.notificationService.showError(error.error.message, "Error !!")
      }
    );
  }

  get vehicleFormControls() {
    return this.addVehicleForm.controls;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }

  getItemsForCurrentPage() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.vehicleList.slice(startIndex, endIndex);
  }
}
