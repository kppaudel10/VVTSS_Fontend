import {Component, OnInit} from '@angular/core';
import {UserDataService} from "../user-request/user.data.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BaseService} from "../../../baseService/baseService";
import baseURL from "../../../baseService/helper";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user-request-view',
  templateUrl: './user-request-view.component.html',
  styleUrls: ['./user-request-view.component.scss']
})
export class UserRequestViewComponent extends BaseService implements OnInit {
  public selectedUserData: any;
  public kycDisplayForm: FormGroup | any
  public imageList: string[] = [];
  images: { url: string, data: string }[] = [];
  public profilePictureUrl: any
  public citizenshipFontUrl: any
  public citizenshipBackUrl: any
  public selectUserId : any

  constructor(private userDataService: UserDataService,
              private formBuilder: FormBuilder,
              private userService: UserService) {
    super();
  }

  ngOnInit(): void {
    this.kycDisplayForm = this.formBuilder.group({
      name: [''],
      contact: [''],
      address: [''],
      email: [''],
      citizenshipNo: [''],
    })
    this.selectedUserData = this.userDataService.getUserData();
    this.selectUserId = this.selectedUserData.userId;
    // globally set images url
    this.profilePictureUrl = baseURL.concat(this.selectedUserData.profilePictureUrl)
    this.citizenshipFontUrl = baseURL.concat(this.selectedUserData.citizenshipFontUrl)
    this.citizenshipBackUrl = baseURL.concat(this.selectedUserData.citizenshipBackUrl)
    this.imageList.push(this.profilePictureUrl)
    this.imageList.push(this.citizenshipFontUrl)
    this.imageList.push(this.citizenshipBackUrl)
    console.log("imageList", this.imageList)

    this.imageList.forEach(image => {
      this.userService.getFetchImage(image).subscribe(
        (preview) => {
          // Process the image data if required
        },
        (error) => {
          console.log('Error retrieving image:', error);
        }
      );
    });

    // patch others text value in form
    this.kycDisplayForm.patchValue(this.selectedUserData)
  }

  getAcceptKycForm(userId: any) {
    this.userService.getActionOnKyc(userId, 'accept').subscribe(
      (response: any) => {
        // action here
      },
      error => {
        console.error(error);
      }
    )
  }

  getRejectKycForm(userId: any) {
    this.userService.getActionOnKyc(userId, 'reject').subscribe(
      (response: any) => {
        // action here
      },
      error => {
        console.error(error);
      }
    )
  }

}
