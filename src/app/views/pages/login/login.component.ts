import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../publicuser/user.service';
import { Login } from 'src/app/models/Login';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private login: UserService,
              private formBuilder: FormBuilder,
              private router: Router,
              ) { }

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
      alert('invalisdd');
      return;
    }

    // login service injected....
    this.login.OnLogedIn(this.loginForm?.value)?.subscribe(
      (res: any) => {
        console.log('response Success', res);
        localStorage.setItem("token", (res.data.token));
      this.router.navigate(['/home']);
      Swal.fire('login Successfully !!!','User id is: ' ,'success')
       
      },
      (error: any) => {
        console.log('Response Error', error);
        alert(error);
      });
  }

  get f() {
    return this.loginForm?.controls;
  }


}