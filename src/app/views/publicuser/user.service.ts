import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Login} from 'src/app/models/Login';
import {BaseService} from 'src/app/baseService/baseService';
import {PublicUser} from 'src/app/models/user'
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  submitForm(value: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient, private rout: Router) {
    super();
    this.serviceUrl = this.baseUrl;
  }

  // public user register
  public regiserUser(user: PublicUser): Observable<any> {
    return this.http.post(`${this.serviceUrl}/api/public-user/save`, user);

  }

// login user
  public OnLogedIn(loginData: Login): Observable<any> {
    return this.http.post(`${this.serviceUrl}/login`, loginData);

  }


  loginUser(token: string) {
    localStorage.setItem('token', token);
    return true;
  }

// delete the login
  logOut() {
    localStorage.removeItem('token');
    this.rout.navigate(['/login']);
  }


  public getToken() {
    return localStorage.getItem('token');
  }

  // Api to fetch user role privilege
  public getCallInit(): Observable<any> {
    return this.http.get(`${this.serviceUrl}/init`, this.getHeaders())
  }

  // Api to fetch profile picture of login user
  public getProfilePicture(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${this.serviceUrl}/api/public-user/profile-picture`, {
      headers,
      observe: 'response',
      responseType: 'blob'
    })
  }

  // Api to save user kyc data
  public submitFor(data: FormData) {
    return this.http.post(`${this.serviceUrl}/api/public-user/kyc-update`, data, this.getHeadersWithMultipart())
  }

  // Api to fetch user basic information
  public getKycBasicDetails() {
    return this.http.get(`${this.serviceUrl}/api/public-user/basic-detail`, this.getHeaders())
  }

  // Api to fetch user-request list
  public getUserRequestList() {
    return this.http.get(`${this.serviceUrl}/api/public-user/kyc-request`, this.getHeaders())
  }

  // Api to fetch image
  public getFetchImage(imageUrl: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(imageUrl, {headers, observe: 'response', responseType: 'blob'})
    // return this.http.get(imageUrl, this.getHeaders())
  }

  // Api to take action on Kyc request such as Accept/Reject
  public getActionOnKyc(userId: number, actionType: string) {
    return this.http.get(`${this.serviceUrl}/api/public-user/kyc-action/` + userId + '/' + actionType, this.getHeaders())
  }

  // Api to generate Qr code
  public getGenerateQrCode() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${this.serviceUrl}/api/public-user/qr-code-generate`, {
      headers,
      observe: 'response',
      responseType: 'blob'
    })
  }

  //Api to download qr code image
  public downloadQrCodeImage() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(`${this.serviceUrl}/api/public-user/qr-code/download`, {
      headers,
      observe: 'response',
      responseType: 'blob'
    });
  }

  //Api to validate buyer detail and generate token and send to user email
  public validateUserAndGenerateToken(data: any) {
    return this.http.post(`${this.serviceUrl}/api/pincode/generate`, data, this.getHeaders());
  }

  // Api to validate User pin code
  public validateUserPinCode(pinCode: any) {
    return this.http.get(`${this.serviceUrl}/api/pincode/validate?pinCode=` + pinCode, this.getHeaders());
  }

  // Api to save user vehicle buy request
  public saveVehicleBuyRequest(data: any) {
    return this.http.post(`${this.serviceUrl}/api/vehicle/buy-request`, data, this.getHeaders());
  }

  // Api to fetch user vehicle buy request lsit
  public getVehicleBuyRequestList() {
    return this.http.get(`${this.serviceUrl}/api/vehicle/buy-request/list`, this.getHeaders());
  }

}
