import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-kyc-update',
  templateUrl: './user-kyc-update.component.html',
  styleUrls: ['./user-kyc-update.component.scss']
})
export class UserKycUpdateComponent implements OnInit {
  public visible = false;
  public form: FormGroup | any;
  public kycDetails: any; // Variable to store KYC details
  public isKycRejects: boolean | undefined

  constructor(private kycService: UserService,
              private formBuilder: FormBuilder,
              private cdr: ChangeDetectorRef,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      citizenshipNo: ['', Validators.required],
      profilePicture: [null, Validators.required],
      citizenshipFont: [null, Validators.required],
      citizenshipBack: [null, Validators.required]
    });
  }

  uploadImage(event: any, controlName: string) {
    const file: File = event.target.files[0];
    this.form.controls[controlName].patchValue([file]);
    this.form.get(controlName).updateValueAndValidity()
  }

  submitForm() {
    let formData: any = new FormData();
    Object.keys(this.form.controls).forEach(formControlName => {
      if (formControlName == 'profilePicture' || formControlName === 'citizenshipFont'
        || formControlName === 'citizenshipBack') {
        const file: File = this.form.get(formControlName).value[0];
        formData.append(formControlName, file);
      } else {
        formData.append(formControlName, this.form.get(formControlName).value);
      }
    });
    this.kycService.submitFor(formData).subscribe(
      (response: any) => {
        // Handle successful form submission
        Object.keys(this.form.controls).forEach((controlName) => {
          this.form.controls[controlName].setValue(this.form.controls.value);
        });
        this.cdr.detectChanges();
      },
      (error: any) => {
        // Handle error during form submission
        console.error('error res:', error);
      }
    );
  }

  kycUpdateButton() {

    this.kycService.getKycBasicDetails().subscribe(
      (data: any) => {
        this.kycDetails = data.data; // Store the retrieved KYC details in the variable
        this.form.patchValue(this.kycDetails);
      },
      (error: any) => {
        console.log(error);
      }
    );
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  isKycReject() {
    if (this.kycDetails['isKycRejected'] === true) {
      this.isKycRejects = true;
    } else {
      this.isKycRejects = false;
    }
  }


}
