import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData: any;
  private buyerUserData: any;
  private vehicleRelatedData: string[] = [];

  setUserData(userData: any): void {
    this.userData = userData;
  }

  getUserData(): any {
    return this.userData;
  }

  setBuyerUserData(buyerUserData: any) {
    this.buyerUserData = buyerUserData;
  }

  getBuyerUserData(): any {
    return this.buyerUserData;
  }

  setVehicleRelatedData(data: any){
    this.vehicleRelatedData = data;
  }

  getVehicleRelatedData(){
    return this.vehicleRelatedData;
  }

}
