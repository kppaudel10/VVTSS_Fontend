import {HttpClient} from '@angular/common/http';
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

  /*
  getToken() {
      return localStorage.getItem('token');
  }*/
  public getToken() {
    return localStorage.getItem('token');
  }

// init Api


  public getCallInit(): Observable<any> {
    return this.http.get(`${this.serviceUrl}/init`, this.getHeaders())
  }

  public submitFor(data: FormData) {
    return this.http.post(`${this.serviceUrl}/api/public-user/kyc-update`, data, this.getHeadersWithMultipart())
  }

// basic kyc update details api
  public getKycBasicDetails() {
    return this.http.get(`${this.serviceUrl}/api/public-user/basic-detail`, this.getHeaders())
  }


}
