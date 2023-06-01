import {Component, OnInit} from '@angular/core';
import {AdminDataService} from "../admin.data.service";
import {UserService} from "../../publicuser/user.service";
import {BaseService} from "../../../baseService/baseService";
import baseURL from "../../../baseService/helper";
import {NotificationService} from "../../../baseService/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ownership-request-view',
  templateUrl: './ownership-request-view.component.html',
  styleUrls: ['./ownership-request-view.component.scss']
})
export class OwnershipRequestViewComponent extends BaseService implements OnInit {

  public buyerAndSellerData: any;
  public buyerProfilePicture: string | undefined;
  public sellerProfilePicture: string | undefined;

  constructor(private adminDataService: AdminDataService,
              private userService: UserService,
              private notificationService: NotificationService,
              private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.buyerAndSellerData = this.adminDataService.getBuyerAndSellerData();

    // get buyer profile picture
    this.userService.getFetchImage(baseURL.concat(this.buyerAndSellerData.buyerProfileUrl))
      .subscribe((response: any) => {
        // create image form blob
        this.createImageFromBlob(response.body, 'buyer')
      });

    // get buyer profile picture
    this.userService.getFetchImage(baseURL.concat(this.buyerAndSellerData.sellerProfileUrl))
      .subscribe((response: any) => {
        // create image form blob
        this.createImageFromBlob(response.body, 'seller')
      });

  }

  createImageFromBlob(imageData: Blob, keyName: string): void {
    const reader = new FileReader();
    reader.onloadend = () => {
      // this.images[this.imageIndex++] = reader.result as string;
      if (keyName === 'buyer') {
        this.buyerProfilePicture = reader.result as string;
      } else if (keyName === 'seller') {
        this.sellerProfilePicture = reader.result as string;
      }
    };
    reader.readAsDataURL(imageData);
  }

  acceptBuyRequest(id: number) {
    const data = {
      id: id,
      actionType: 'accept',
      actionBy: 'admin'
    };
    this.userService.takeActionSellRequest(data).subscribe(
      (response: any) => {
        console.log("acceptdata", response)
        // Handle successful form submission
        this.notificationService.showSuccess(response.data, "Success !!")
        // reload the page
        this.router.navigate(['/home/ownership-request']);
      },
      (error: any) => {
        // Handle error during form submission
        this.notificationService.showError(error.error.message, "Error !!")
      });
  }

  rejectBuyRequest(id: number) {
    const data = {
      id: id,
      actionType: 'reject',
      actionBy: 'admin'
    };
    this.userService.takeActionSellRequest(data).subscribe(
      (response: any) => {
        // Handle successful form submission
        this.notificationService.showSuccess(response.data, "Success !!")
        // reload the page
        this.router.navigate(['/home/ownership-request']);
      },
      (error: any) => {
        // Handle error during form submission
        this.notificationService.showError(error.error.message, "Error !!")
      });
  }


}
