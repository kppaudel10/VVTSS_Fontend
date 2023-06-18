import {Component, OnInit} from '@angular/core';
import {UserDataService} from '../../publicuser/user-request/user.data.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from "../../publicuser/user.service";
import {BaseService} from "../../../baseService/baseService";
import baseURL from "../../../baseService/helper";

@Component({
  selector: 'app-number-plate-scan-process',
  templateUrl: './number-plate-scan-process.component.html',
  styleUrls: ['./number-plate-scan-process.component.scss']
})
export class NumberPlateScanProcessComponent extends BaseService implements OnInit {

  public userDataDetail: any;
  public displayForm: FormGroup | any
  public userProfile: any

  constructor(private userDataService: UserDataService,
              private formBuilder: FormBuilder,
              private userService: UserService) {
    super()
  }

  ngOnInit(): void {
    // Initialize the reactive form
    this.userDataDetail = this.userDataService.getUserData();
    console.log("userDataxx", this.userDataDetail);

    // call for profile picture
    this.userService.getFetchImage(baseURL.concat(this.userDataDetail.profileImageUrl))
      .subscribe((response: any) => {
        // create image form blob
        this.createImageFromBlob(response.body, 'profile')
      });

  };

  createImageFromBlob(imageData: Blob, keyName: string): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.userProfile = reader.result as string;
    };
    reader.readAsDataURL(imageData);
  }

}
