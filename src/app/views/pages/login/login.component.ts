import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../publicuser/user.service';
import {Router} from '@angular/router';

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
<<<<<<< HEAD
              private router: Router,
              
              
              ) { }
=======
              private router: Router) {
  }
>>>>>>> c9d25b0e5d065c9f932974ab2b5922679cc22d7a

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
<<<<<<< HEAD
     
=======
>>>>>>> c9d25b0e5d065c9f932974ab2b5922679cc22d7a
      return;
    }

    // login service injected....
    this.login.OnLogedIn(this.loginForm?.value)?.subscribe(
      (res: any) => {
        console.log('response Success', res);
        localStorage.setItem("token", (res.data.token));
<<<<<<< HEAD
      this.router.navigate(['/home']);
      Swal.fire('login Successfully !!!','User id is: ' ,'success')
       
=======
        this.router.navigate(['/home']);

>>>>>>> c9d25b0e5d065c9f932974ab2b5922679cc22d7a
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
