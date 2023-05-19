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
  public form: FormGroup | any;
  public kycDetails: any; // Variable to store KYC details
  public isKycRejects: boolean | undefined
  

  constructor(private kycService: UserService,
              private formBuilder: FormBuilder,
              private cdr: ChangeDetectorRef,
              private route: Router){}

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
    const files = event.target.files;
   // Convert FileList to an array
    if (files != null ) {
      this.form.patchValue({ [controlName]: files });
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
        Swal.fire('sucess kyc Updated','success',);
         this.route.navigate(['/home/user/update-kyc']);
            
      },
      (error: any) => {
        // Handle error during form submission
        console.error('error res:', error);
      });
     
  }

  kycUpdateButton() {

    this.kycService.getKycBasicDetails().subscribe(
      (data: any) => {
        this.kycDetails = data.data; // Store the retrieved KYC details in the variable
        this.form.patchValue(this.kycDetails);
        console.log('dataxxxx',this.kycDetails);
       
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

  isKycReject(){

    if(this.kycDetails.get('isKycRejected') === true){
      this.isKycRejects = true;
    } else {
      this.isKycRejects = false;
    }
  }
 


}
