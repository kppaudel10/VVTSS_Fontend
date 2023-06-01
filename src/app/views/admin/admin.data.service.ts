import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {

  private buyerAndSellerData: any;

  setBuyerAndSellerData(buyerAndSellerData: any) {
    this.buyerAndSellerData = buyerAndSellerData;
  }

  getBuyerAndSellerData(): any {
    return this.buyerAndSellerData;
  }

}
