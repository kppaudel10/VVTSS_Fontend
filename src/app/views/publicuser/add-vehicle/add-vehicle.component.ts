import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { NotificationService } from 'src/app/baseService/notification.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {

  addVehicleForm: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService) {
  }


  ngOnInit(): void {
    this.addVehicleForm = this.formBuilder.group({
      manufactureYear: ['', Validators.required],
      vehicleType: ['', Validators.required],
      companyCode: ['', Validators.required],

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

  get f() {
    return this.addVehicleForm?.controls;
  }

}
