import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-kyc-update',
  templateUrl: './user-kyc-update.component.html',
  styleUrls: ['./user-kyc-update.component.scss']
})
export class UserKycUpdateComponent implements OnInit{
  public visible = false;
  public form!: FormGroup;
  public kycDetails: any; // Variable to store KYC details

  constructor(private kycService: UserService,
              private formBuilder: FormBuilder,
              private cdr: ChangeDetectorRef,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['',  Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      profileImageUrl: [null, Validators.required],
      citizenshipNo: ['', Validators.required],
      citizenshipFontUrl: ['', Validators.required],
      citizenshipBackUrl: ['', Validators.required]

    });

    this.kycDetails.getKycBasicDetails().subscribe(
      (data: any) => {
        this.kycDetails = data; // Store the retrieved KYC details in the variable
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  uploadImage(event: any, controlName: string) {
    const files = event.target.files;
    const fileList: File[] = Array.from(files); // Convert FileList to an array
  
    if (fileList.length > 0) {
      this.form.patchValue({ [controlName]: fileList });
    }
  }

  submitForm() {
    if (this.form?.invalid) {
      alert("invalid form")
    }

    this.kycService.submitFor(this.form?.value)?.subscribe(
      (response:any) => {
        // Handle successful form submission
        console.log('respose is: ', response)
        Object.keys(this.form.controls).forEach((controlName) => {
          this.form.controls[controlName].setValue(null);
        });
  
        this.cdr.detectChanges();     
      },
      (error:any) => {
        // Handle error during form submission
        console.error('error res:', error);
      }
    );
  }

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

}
