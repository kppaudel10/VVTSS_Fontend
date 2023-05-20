import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../publicuser/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { ToastrService } from 'ngx-toastr'; 
import { NotificationService } from 'src/app/baseService/notification.service'

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
    ///private toastr: ToastrService
    )
     { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    console.log(this.loginForm?.value);
    this.submitted = true;
    if (this.loginForm?.invalid) {
     this.notify.showError('Not Valid Username and Password','error');
      return;
    }

    // login service injected....
    this.login.OnLogedIn(this.loginForm?.value)?.subscribe(
      (res: any) => {
        console.log('response Success', res);
        localStorage.setItem("token", (res.data.token));

       // Swal.fire('login Successfully !!!', 'success')
       this.notify.showSuccess('Login Successful', 'Success');
        this.router.navigate(['/home']);

      },
      (error: any) => {
        this.notify.showError('Something wrong Check Server !','error');
      });
  }
  get f() {
    return this.loginForm?.controls;
  }
 


}
