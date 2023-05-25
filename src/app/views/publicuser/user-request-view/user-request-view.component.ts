import {Component, OnInit} from '@angular/core';
import {UserDataService} from "../user-request/user.data.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BaseService} from "../../../baseService/baseService";
import baseURL from "../../../baseService/helper";
import {UserService} from "../user.service";
import {NotificationService} from "../../../baseService/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-request-view',
  templateUrl: './user-request-view.component.html',
  styleUrls: ['./user-request-view.component.scss']
})
export class UserRequestViewComponent extends BaseService implements OnInit {
  public selectedUserData: any;
  public kycDisplayForm: FormGroup | any
  public profilePictureUrl: any
  public citizenshipFontUrl: any
  public citizenshipBackUrl: any
  public selectUserId: number = 0
  public isPictureShowUpVisible: boolean = false;
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

  openImageDisplayModal(selectedImageKey: string) {
    this.selectedImageKeyName = selectedImageKey;
    console.log("selectedImageKey", selectedImageKey)
    if (selectedImageKey === 'profile') {
      this.selectedImageName = "Profile Picture"
    } else if (selectedImageKey === 'citizenshipFont') {
      this.selectedImageName = "Citizenship Font"
    } else if (selectedImageKey === 'citizenshipBack') {
      this.selectedImageName = "Citizenship Back"
    } else {
      this.selectedImageName = "Unknown"
    }
    this.isPictureShowUpVisible = true;
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

