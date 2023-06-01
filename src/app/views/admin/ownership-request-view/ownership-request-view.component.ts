import {Component, OnInit} from '@angular/core';
import {AdminDataService} from "../admin.data.service";
import {UserService} from "../../publicuser/user.service";
import {BaseService} from "../../../baseService/baseService";
import baseURL from "../../../baseService/helper";

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
              private userService: UserService) {
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

}
