import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ClassToggleService, HeaderComponent} from '@coreui/angular';
import {UserService} from "../../../views/publicuser/user.service";

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
              private userService: UserService) {
    super();
  }
  
  ngOnInit() {

    // call for profile picture
    this.userService.getProfilePicture()
      .subscribe((response: any) => {
        // create image form blob
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
    if (imageData != undefined) {
      this.isProfilePictureExits = true;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      this.profilePictureImage = reader.result as string;
    };
    reader.readAsDataURL(imageData);
  }

  public visible = false;

  toggleClose() {
    this.visible = !this.visible;
  }

  handleProfileChange(event: any) {
    this.visible = event;
  }
}
