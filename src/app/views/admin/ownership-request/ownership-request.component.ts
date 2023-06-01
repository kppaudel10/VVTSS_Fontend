import {Component, OnInit} from '@angular/core';
import {AdminService} from "../admin.service";
import {NotificationService} from "../../../baseService/notification.service";
import {AdminDataService} from "../admin.data.service";
import {GlobalMethodService} from "../../global.method.service";

@Component({
  selector: 'app-ownership-request',
  templateUrl: './ownership-request.component.html',
  styleUrls: ['./ownership-request.component.scss']
})
export class OwnershipRequestComponent extends GlobalMethodService implements OnInit {

  public buyerAndSellerData: any[] | undefined;

  constructor(private adminService: AdminService,
              private notificationService: NotificationService,
              private adminDataService: AdminDataService) {
    super();
  }

  ngOnInit(): void {
    this.getBuyerAndSellerData();
    console.log("owershipdata", this.buyerAndSellerData)
  }

  getBuyerAndSellerData() {
    this.adminService.getOwnershipRequestList().subscribe(
      (response: any) => {
        this.buyerAndSellerData = response.data;
        console.log("owershipdata", response.data)
      },
      (error: any) => {
        // Handle error during form submission
        this.notificationService.showError(error.error.message, "Error !!")
      });
  }

  setSelectedOwnershipData(buyerAndSellerData: any) {
    this.adminDataService.setBuyerAndSellerData(buyerAndSellerData);
  }

}
