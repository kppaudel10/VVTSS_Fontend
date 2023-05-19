import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {UserDataService} from "./user.data.service";

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})

export class UserRequestComponent implements OnInit {

  public userKycRequestList: any[] | undefined
  public selectedUserData: any

  constructor(private userService: UserService,
              private userDataService: UserDataService) {
  }

  ngOnInit(): void {
    // get and set user kyc request
    this.getUserKycRequestList();
    console.log("userKycRequest", this.userKycRequestList)
  }

  getUserKycRequestList() {
    this.userService.getUserRequestList().subscribe(
      (response: any) => {
        this.userKycRequestList = response.data;
      },
      error => {
        console.error(error);
      }
    )
  }

  setSelectedUserDataAsSharedData(userData: any) {
    this.userDataService.setUserData(userData);
  }

}
