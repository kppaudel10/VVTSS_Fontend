import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public profilePictureImage: string | any
  public isProfilePictureExits: boolean = false
  public useerDetails: any;

  constructor(private userService: UserService,
    private ref: MatDialogRef<UserProfileComponent>) { }

  ngOnInit(): void {
    this.getUserDetails();
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

  closeProfile() {
    this.ref.close();

  }

  getUserDetails(){
    this.userService.getKycBasicDetails().subscribe(
     (res: any) =>{
      this.useerDetails = res.data;
      console.log("data : ", res.data);
     },
     (error: any) =>{

     },
    )
  }

}
