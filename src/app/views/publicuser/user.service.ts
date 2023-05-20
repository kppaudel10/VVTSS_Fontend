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

// checketd the the token or not
  isLoggedIn() {
    const token = localStorage.getItem('token');
    if (token === undefined || token === '' || token === null) {
      return false;
    } else {
      return true;
    }
  }

// deletet the login
  logOut() {
    localStorage.removeItem('token');
    this.rout.navigate(['']);
  }


  public getToken() {
    return localStorage.getItem('token');
  }

  // Api to fetch user role privilege
  public getCallInit(): Observable<any> {
    return this.http.get(`${this.serviceUrl}/init`, this.getHeaders())
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
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token); // Replace 'your-token' with the actual token
    return this.http.get(imageUrl, {headers, observe: 'response', responseType: 'arraybuffer'})
  }

  // Api to take action on Kyc request such as Accept/Reject
  public getActionOnKyc(userId: number, actionType: string) {
    return this.http.get(`${this.serviceUrl}/api/public-user/kyc-action/` + userId + '/' + actionType, this.getHeaders())
  }

}
