import {Component, OnInit} from '@angular/core';
import {UserDataService} from "../user-request/user.data.service";
import {UserService} from "../user.service";
import {BaseService} from "../../../baseService/baseService";
import baseURL from "../../../baseService/helper";

@Component({
  selector: 'app-sell-vehicle-details',
  templateUrl: './sell-vehicle-details.component.html',
  styleUrls: ['./sell-vehicle-details.component.scss']
})
export class SellVehicleDetailsComponent extends BaseService implements OnInit {

  public buyerUserData: any;
  public buyerProfilePicture: any

  constructor(private userDataService: UserDataService,
              private userService: UserService) {
    super();
  }

  ngOnInit(): void {

    this.buyerUserData = this.userDataService.getBuyerUserData();
    // call for profile picture
    this.userService.getFetchImage(baseURL.concat(this.buyerUserData.buyerProfilePictureUrl))
      .subscribe((response: any) => {
        // create image form blob
        this.createImageFromBlob(response.body)
      });
  }

  createImageFromBlob(imageData: Blob): void {
    const reader = new FileReader();
    reader.onloadend = () => {

      this.buyerProfilePicture = reader.result as string;
    };
    reader.readAsDataURL(imageData);
  }


  getVehicleTypeName(typeInt: any) {
    if (typeInt === "0" || typeInt === 0) {
      return "Scooter";
    } else if (typeInt === "1" || typeInt === 1) {
      return "Bike";
    } else if (typeInt === "2" || typeInt === 2) {
      return "Car";
    } else {
      return "";
    }

  }

}
