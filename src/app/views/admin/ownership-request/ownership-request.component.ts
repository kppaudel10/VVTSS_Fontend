import {Component, OnInit} from '@angular/core';
import {AdminService} from "../admin.service";
import {NotificationService} from "../../../baseService/notification.service";
import {AdminDataService} from "../admin.data.service";

@Component({
  selector: 'app-ownership-request',
  templateUrl: './ownership-request.component.html',
  styleUrls: ['./ownership-request.component.scss']
})
export class OwnershipRequestComponent implements OnInit {

  public buyerAndSellerData: any[] | undefined;

  constructor(private adminService: AdminService,
              private notificationService: NotificationService,
              private adminDataService: AdminDataService) {
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

  setSelectedOwnershipData(buyerAndSellerData: any) {
    this.adminDataService.setBuyerAndSellerData(buyerAndSellerData);
  }

}
