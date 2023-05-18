import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/Login';
import { BaseService } from 'src/app/baseService/baseService';
import {PublicUser} from 'src/app/models/user'
import { Router } from '@angular/router';

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
  public regiserUser(user: PublicUser): Observable<any>{
    return this.http.post(`${this.serviceUrl}/api/public-user/save`,user,{ 'headers': this.getHeaders() });
 
   }
// login user
   public OnLogedIn(loginData: Login): Observable<any>{
    return this.http.post(`${this.serviceUrl}/login`,loginData,{ 'headers': this.getHeaders()});
    
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


public getCallInit(): Observable<any>{
  const token = localStorage.getItem('token');
  console.log('ranmatiToken',token);
  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
return this.http.get(`${this.serviceUrl}/init`,{ headers} )
}

public kycUpdate(data: any){
  return this.http.post(`${this.serviceUrl}/api/public-user/kyc-update`,data,{ 'headers': this.getHeaders()})
}
 
public submitForms(data: any) {
  return this.http.post(`${this.serviceUrl}/api/public-user/kyc-update`,data,{ 'headers': this.getHeaders()})
   
}


 public submitFor(data: any): Observable<any> {
  const formData = new FormData();

  for (const key in data) {
    if (key === 'profileImageUrl' || key === 'citizenshipFontUrl' || key === 'citizenshipBackUrl') {
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      }
    } else {
      formData.append(key, data[key]);
    }
  }

  return this.http.post(`${this.serviceUrl}/api/public-user/kyc-update`,formData,{ 'headers': this.getHeaders()})
}

// basic kyc update details api

public getKycBasicDetails(){
  const token = localStorage.getItem('token');
  console.log('ranmatiToken',token);
  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
 
  return this.http.get(`${this.serviceUrl}/api/public-user/basic-detail`, { 'headers': this.getHeaders()})
}

}
