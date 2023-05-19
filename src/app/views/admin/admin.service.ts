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
}
