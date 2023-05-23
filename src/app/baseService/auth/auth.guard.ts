import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from "./auth.service";
import {NotificationService} from "../notification.service";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private notificationService: NotificationService) {

  }

  canActivate(): Observable<boolean> {
    if (this.authService.isLoggedIn()) {
      return of(true);
    }
    this.router.navigate(['login'])
    this.notificationService.showError("Your credentials are currently invalid.", "Session Expired !!")
    return of(false);
  }

}

