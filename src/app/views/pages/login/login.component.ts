import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../publicuser/user.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
//import { ToastrService } from 'ngx-toastr';
import {NotificationService} from 'src/app/baseService/notification.service'
import {AuthService} from "../../../baseService/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private _snack: MatSnackBar,
    private login: UserService,
    private router: Router,
    private notify: NotificationService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    // first check if user already login or not if yes then give direct access to that user
    if (this.authService.isLoggedIn()) {
      this.notify.showInfo("You are already logged in.", 'Notification !!');
      this.router.navigate(['/home']);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    console.log(this.loginForm?.value);
    this.submitted = true;
    if (this.loginForm?.invalid) {
      this.notify.showError('Not Valid Username and Password', 'Error !!');
      return;
    }

    // login service injected....
    this.login.OnLogedIn(this.loginForm?.value)?.subscribe(
      (res: any) => {
        console.log('response Success', res);
        localStorage.setItem("token", (res.data.token));
        this.notify.showSuccess("Login successfully", 'Success');
        if (res.data.username === 'admin') {
          this.router.navigate(['/home/dash']);
        } else {
          this.router.navigate(['/home']);
        }
      },

      (error: any) => {
        console.log('response Success', error);
        this.notify.showError(error.error.message, 'Error !!');
      });
  }

  get f() {
    return this.loginForm?.controls;
  }

}
