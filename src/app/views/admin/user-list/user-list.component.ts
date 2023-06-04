import {Component, OnInit} from '@angular/core';
import {UserDataService} from "../../publicuser/user-request/user.data.service";
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public userKycRequestList: any[] | undefined
  public selectedUserData: any

  constructor(private adminService: AdminService,
              private userDataService: UserDataService) {
  }

  ngOnInit(): void {
    // get and set user kyc request
    this.getActiveUserList();
    console.log("userKycRequest", this.userKycRequestList)
  }

  getActiveUserList() {
    this.adminService.getActiveUserList().subscribe(
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
