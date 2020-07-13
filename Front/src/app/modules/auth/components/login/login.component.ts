import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Form
  loginForm: FormGroup;
  // Handle Loading
  loadingLogin: boolean;
  // Handle Errors
  loginError: boolean;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.loadingLogin = false;

    this.loginError = false
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login():void {
    this.loadingLogin = true;
    let email = this.f.email.value;
    let password = this.f.password.value;

    this.authService.signIn(email, password).subscribe(
      (response) => {
        console.log(response)
        this.userService.setUser(response.user);
        this.router.navigate(['/dashboard']);
        this.loadingLogin = false;
      },
      (err) => {
        console.log(err);
        this.loadingLogin = false;
        this.errorMessage = err;
      }
    );
  }

}


