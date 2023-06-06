import {Component, OnInit} from '@angular/core';
import {UserDataService} from "../../publicuser/user-request/user.data.service";
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public activeUserList: any[] | undefined
  public selectedUserData: any

  constructor(private adminService: AdminService,
              private userDataService: UserDataService) {
  }

  ngOnInit(): void {
    // get and set user kyc request
    this.getActiveUserList();
    console.log("userKycRequest", this.activeUserList)
  }

  getActiveUserList() {
    this.adminService.getActiveUserList().subscribe(
      (response: any) => {
        this.activeUserList = response.data;
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
