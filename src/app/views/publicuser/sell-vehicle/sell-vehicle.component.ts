import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {NotificationService} from 'src/app/baseService/notification.service';
import {UserDataService} from "../user-request/user.data.service";

@Component({
  selector: 'app-sell-vehicle',
  templateUrl: './sell-vehicle.component.html',
  styleUrls: ['./sell-vehicle.component.scss']
})
export class SellVehicleComponent implements OnInit {

  public sellVehicleList: any[] | undefined;

  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private userDataService: UserDataService) {
  }

  ngOnInit(): void {
    this.getSellVehicleList();
  }

  //getVehicle List from Service
  getSellVehicleList() {
    this.userService.getVehicleSellList().subscribe(
      (res: any) => {
        console.log('Sucess data: ', res.data);
        this.sellVehicleList = res.data;
      },
      (error: any) => {
        console.log('error', error)
        this.notificationService.showWarnig('Data Not Loaded', 'warning');
      }
    )
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

  getAndSetSelectedBuyerData(buyerUserData: any) {
    this.userDataService.setBuyerUserData(buyerUserData);
  }

}
