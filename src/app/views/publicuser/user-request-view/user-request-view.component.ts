import {Component, OnInit} from '@angular/core';
import {UserDataService} from "../user-request/user.data.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BaseService} from "../../../baseService/baseService";
import baseURL from "../../../baseService/helper";
import {UserService} from "../user.service";
import {HttpResponse} from "@angular/common/http";
import {NotificationService} from "../../../baseService/notification.service";
import {Router} from "@angular/router";
import * as Buffer from "buffer";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-user-request-view',
  templateUrl: './user-request-view.component.html',
  styleUrls: ['./user-request-view.component.scss']
})
export class UserRequestViewComponent extends BaseService implements OnInit {
  public selectedUserData: any;
  public kycDisplayForm: FormGroup | any
  public imageList: string[] = [];
  public images: string[] = [];
  public profilePictureUrl: any
  public citizenshipFontUrl: any
  public citizenshipBackUrl: any
  public selectUserId: any

  constructor(private userDataService: UserDataService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private notificationService: NotificationService,
              private router: Router,
              private sanitizer: DomSanitizer
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
    this.selectUserId = this.selectedUserData.userId;
    // globally set images url
    this.profilePictureUrl = baseURL.concat(this.selectedUserData.profilePictureUrl)
    this.citizenshipFontUrl = baseURL.concat(this.selectedUserData.citizenshipFontUrl)
    this.citizenshipBackUrl = baseURL.concat(this.selectedUserData.citizenshipBackUrl)
    this.imageList.push(this.profilePictureUrl)
    this.imageList.push(this.citizenshipFontUrl)
    this.imageList.push(this.citizenshipBackUrl)
    console.log("imageList", this.imageList)

    debugger
    this.imageList.forEach(image => {
      this.userService.getFetchImage(image)
        .subscribe((response:  any) => {
          // console.log(JSON.parse(String.fromCharCode.apply(null, new Uint8Array(response.body))
          // console.log(response.url,'this')
          // this.images.push(response.url)
          // console.log("basexx",atob(response.body) )
          // console.log('b',String.fromCharCode.apply(null, new Uint8Array(response.body)))
          // const bytes = new Uint8Array(response.body);
          // @ts-ignore
          // console.log(JSON.parse(JSON.stringify(String.fromCharCode.apply(null,bytes))),'bat');
          // const binary = Array.from(bytes).map(byte => String.fromCharCode(byte)).join('');
          // console.log(binary,"b")

          // const base64 = btoa(binary);
          // console.log("basexx", atob(base64))
          // this.images.push('data:image/jpeg;base64,' + base64);
        // console.log(response.body,'this')
          debugger
          // @ts-ignore
          const data = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(response.body))).data;
          let objectUrl = 'data:image/jpeg;base64,' + data;
          const img = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
          this.images.push(img as string);

        });
    });
    console.log("imagesURl", this.images)
    // patch others text value in form
    this.kycDisplayForm.patchValue(this.selectedUserData)
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

}
