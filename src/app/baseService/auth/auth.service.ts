import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn() {
    const token = localStorage.getItem('token');
    // tslint:disable-next-line:triple-equals
    if (token == undefined || token == '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

}
