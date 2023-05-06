import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user/user.service';
import { Login } from 'src/app/models/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup = new FormGroup({});
  submitted = false;
  
  constructor(private login: UserService,
    private formBuilder: FormBuilder, ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  onLogin(){
    console.log(this.loginForm?.value);
    this.submitted = true;
   if(this.loginForm?.invalid){
   alert('invalisdd');
    return;
   }

   

// login service injected....
     this.login.OnLogedIn(this.loginForm?.value)?.subscribe(
      (data:any) =>{
        console.log('response Success',data);
        localStorage.setItem("token", data.token,);
        alert('sucess')
       // this.route.navigateByUrl('/user/register');
        
      },
      (error:any)=>{
        console.log('Response Error',error);
        alert(error);
      });
 }

  get f() {
    return this.loginForm?.controls;
  }

}