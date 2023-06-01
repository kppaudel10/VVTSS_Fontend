import {BaseService} from "../../baseService/baseService";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService {

  constructor(private http: HttpClient, private rout: Router) {
    super();
    this.serviceUrl = this.baseUrl;
  }

  // Api for save license details
  public saveLicense(data: any) {
    return this.http.post(`${this.serviceUrl}/api/license/save`, data, this.getHeaders());
  }

  // Api to fetch license details list
  public getLicenseDetailList() {
    return this.http.get(`${this.serviceUrl}/api/license/list`, this.getHeaders());
  }

  // Api to search license list
  public getSearchLicense(searchValue: string) {
    let params = new HttpParams().set('searchValue', searchValue);
    return this.http.get(`${this.serviceUrl}/api/license/list?searchValue=` + searchValue, this.getHeaders());
  }

  // Api to save blue-book details
  public saveBlueBookDetail(data: any) {
    return this.http.post(`${this.serviceUrl}/api/blue-book/save`, data, this.getHeaders());
  }

  // Api to fetch blue-book details list
  public getBlueBookDetailList() {
    return this.http.get(`${this.serviceUrl}/api/blue-book/list`, this.getHeaders());
  }

  // Api to filter search details
  public searchBlueBookDetail(searchValue: string) {
    return this.http.get(`${this.serviceUrl}/api/blue-book/list?searchValue=` + searchValue, this.getHeaders());
  }

  // Api to fetch ownership request list
  public getOwnershipRequestList() {
    return this.http.get(`${this.serviceUrl}/api/vehicle/ownership-request/list`, this.getHeaders());
  }

}
