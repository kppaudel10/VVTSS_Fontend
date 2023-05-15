import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {UserService } from 'src/app/views/user/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private rout: Router) { }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]], //Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})')
      confirmPassword: ['',[Validators.required,this.passwordMatchValidator.bind(this)]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.root.get('password');
    const confirmPassword = control.value;

    if (password && confirmPassword && password.value !== confirmPassword) {
        return { 'passwordMismatch': true };
    }

    return null;
}

  onSubmit() {
    console.log(this.registerForm?.value)
    this.submitted = true;
    if (this.registerForm?.invalid) {
      alert('invalid');
      return;
    }
  
    this.userService.regiserUser(this.registerForm?.value)?.subscribe(
      (data: any) => {
        console.log(data)
        this.rout.navigate([''])
      },
      (error: any) => {
        console.log(error);
       alert('erroro')
      });

    this.onReset();
  }

  get f() {
    return this.registerForm?.controls;
  }
  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }

}
