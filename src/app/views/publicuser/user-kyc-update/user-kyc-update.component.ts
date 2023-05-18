import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-kyc-update',
  templateUrl: './user-kyc-update.component.html',
  styleUrls: ['./user-kyc-update.component.scss']
})
export class UserKycUpdateComponent implements OnInit {
  public visible = false;
  public form!: FormGroup;
  public kycDetails: any; // Variable to store KYC details
  public isKycRejects: boolean | undefined;
  submitted = false;


  constructor(private kycService: UserService,
    private formBuilder: FormBuilder,
    private rout: Router,
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      profilePicture: ['', Validators.required],
      citizenshipNo: ['', Validators.required],
      citizenshipFont: ['', Validators.required],
      citizenshipBack: ['', Validators.required]

    });
  }

  uploadImage(event: any, controlName: string) {
    const file = event.target.files[0];
    // Convert FileList to an array
    if (file) {
      this.form.patchValue({ [controlName]: file });
    }
  }

  submitForm() {
    this.submitted = true;
    if (this.form?.invalid) {
      alert("invalid form")
    }

    this.kycService.submitFor(this.form?.value)?.subscribe(
      (response: any) => {
        // Handle successful form submission
        console.log('respose is: ', response)
        Swal.fire('KYC Updated Successfully !!!','User id is: '+ response.data.data.id ,'success')
        this.rout.navigate(['/home/user/update-kyc']);
      },
      (error: any) => {
        // Handle error during form submission
        console.error('error res:', error);
      });
      this.onReset();
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

    if (this.kycDetails.get('isKycRejected') === true) {
      this.isKycRejects = true;
    } else {
      this.isKycRejects = false;
    }
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
