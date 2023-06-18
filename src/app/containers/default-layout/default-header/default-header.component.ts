import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ClassToggleService, HeaderComponent} from '@coreui/angular';
import {UserService} from "../../../views/publicuser/user.service";
import {MatDialog} from '@angular/material/dialog';
import {UserProfileComponent} from 'src/app/views/publicuser/user-profile/user-profile.component';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  public profilePictureImage: string | any
  public isProfilePictureExits: boolean = false

  constructor(private classToggler: ClassToggleService,
              private rout: Router,
              private userService: UserService,
              private dialog: MatDialog) {
    super();
  }

  ngOnInit() {

    // call for profile picture
    this.userService.getProfilePicture()
      .subscribe((response: any) => {
        // create image form blob
        console.log("xxxx", response.body)
        this.createImageFromBlob(response.body)
      });
    if (this.profilePictureImage != undefined) {
      this.isProfilePictureExits = true;
    }
  }

  logout() {
    localStorage.removeItem("token");
    this.rout.navigate(['/login']);
  }

  createImageFromBlob(imageData: Blob): void {
    if (imageData != undefined && imageData.size != 0) {
      this.isProfilePictureExits = true;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      this.profilePictureImage = reader.result as string;
    };
    reader.readAsDataURL(imageData);
  }

  public visible = false;

  toggleLiveDemo() {
    this.visible = !this.visible;
  }

  handleLiveDemoChange(event: any) {
    this.visible = event;
  }

  // user Dialog Box
  openUserProfie() {
    this.dialog.open(UserProfileComponent, {
      width: '60%',

    })
  }

}
