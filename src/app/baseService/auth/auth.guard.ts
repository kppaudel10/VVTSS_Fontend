import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/views/publicuser/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{
  constructor(private auth: UserService,
              private rout: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.auth.isLoggedIn()){
        return true;
      }
   this.rout.navigate(['']);  
return false;
  }
  
}
