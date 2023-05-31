import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userData: any;
  private buyerUserData: any;

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

}
