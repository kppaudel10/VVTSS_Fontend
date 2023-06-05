import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserDataService} from "../../publicuser/user-request/user.data.service";
import {UserService} from "../../publicuser/user.service";
import {NotificationService} from "../../../baseService/notification.service";
import {Router} from "@angular/router";
import baseURL from "../../../baseService/helper";
import {BaseService} from "../../../baseService/baseService";

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.scss']
})
export class UserListViewComponent extends BaseService implements OnInit {
  public selectedUserData: any;
  public kycDisplayForm: FormGroup | any
  public profilePictureUrl: any
  public citizenshipFontUrl: any
  public citizenshipBackUrl: any
  public selectUserId: number = 0
  public isPictureShowUpVisible: boolean = false;
  public isPpShowUpVisible: boolean = false;
  public selectedImageName: string | undefined;
  public profileImage: string | any
  public citizenshipFont: string | any
  public citizenshipBack: string | any
  public selectedImageKeyName: string | any

  constructor(private userDataService: UserDataService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private notificationService: NotificationService,
              private router: Router
  ) {
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
    if (this.selectedUserData != undefined) {
      this.selectUserId = this.selectedUserData.userId;
    }
    // globally set images url
    this.profilePictureUrl = baseURL.concat(this.selectedUserData.profilePictureUrl)
    this.citizenshipFontUrl = baseURL.concat(this.selectedUserData.citizenshipFontUrl)
    this.citizenshipBackUrl = baseURL.concat(this.selectedUserData.citizenshipBackUrl)

    // call for profile picture
    this.userService.getFetchImage(this.profilePictureUrl)
      .subscribe((response: any) => {
        // create image form blob
        this.createImageFromBlob(response.body, 'profile')
      });

    // call for citizenFont
    this.userService.getFetchImage(this.citizenshipFontUrl)
      .subscribe((response: any) => {
        // create image form blob
        this.createImageFromBlob(response.body, 'citizenFont')
      });

    // call for citizenBack
    this.userService.getFetchImage(this.citizenshipBackUrl)
      .subscribe((response: any) => {
        // create image form blob
        this.createImageFromBlob(response.body, 'citizenBack')
      });


    // patch others text value in form
    this.kycDisplayForm.patchValue(this.selectedUserData)
  }

  createImageFromBlob(imageData: Blob, keyName: string): void {
    const reader = new FileReader();
    reader.onloadend = () => {

      // this.images[this.imageIndex++] = reader.result as string;
      if (keyName === 'profile') {
        this.profileImage = reader.result as string;
      } else if (keyName === 'citizenFont') {
        this.citizenshipFont = reader.result as string;
      } else if (keyName === 'citizenBack') {
        this.citizenshipBack = reader.result as string;
      }
    };
    reader.readAsDataURL(imageData);
  }

  getAcceptKycForm(userId: any) {
    this.userService.getActionOnKyc(userId, 'accept').subscribe(
      (response: any) => {
        // action here
        this.notificationService.showSuccess("User Kyc Request Accepted Successfully", "Success !!");
        this.router.navigate(['/home/user-request']);
      },
      error => {
        this.notificationService.showError(error.error.message, "Error !!")
        this.router.navigate(['/home/user-request']);
      }
    )
  }

  getRejectKycForm(userId: any) {
    this.userService.getActionOnKyc(userId, 'reject').subscribe(
      (response: any) => {
        // action here
        this.notificationService.showSuccess("User Kyc Request Rejected Successfully", "Success !!");
        this.router.navigate(['/home/user-request']);
      },
      error => {
        this.notificationService.showError(error.error.message, "Error !!")
        this.router.navigate(['/home/user-request']);
      }
    )
  }

  handlePictureVisibleModal(event: any) {
    this.isPictureShowUpVisible = event;
  }

  handlePpVisibleModal(event: any) {
    this.isPpShowUpVisible = event;
  }

  openImageDisplayModal(selectedImageKey: string) {
    this.selectedImageKeyName = selectedImageKey;
    console.log("selectedImageKey", selectedImageKey)
    if (selectedImageKey === 'profile') {
      this.selectedImageName = "Profile Picture"
      this.isPpShowUpVisible = true
    } else if (selectedImageKey === 'citizenshipFont') {
      this.selectedImageName = "Citizenship Font"
      this.isPictureShowUpVisible = true;
    } else if (selectedImageKey === 'citizenshipBack') {
      this.selectedImageName = "Citizenship Back"
      this.isPictureShowUpVisible = true;
    } else {
      this.selectedImageName = "Unknown"
      this.isPictureShowUpVisible = false;
    }
  }

  getImageByImageKeyName(selectedImageKey: string) {
    if (selectedImageKey === 'profile') {
      return this.profileImage;
    } else if (selectedImageKey === 'citizenshipFont') {
      return this.citizenshipFont;
    } else if (selectedImageKey === 'citizenshipBack') {
      return this.citizenshipBack;
    } else {
      return null;
    }
  }

}
