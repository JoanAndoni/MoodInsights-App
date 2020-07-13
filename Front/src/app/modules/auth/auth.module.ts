import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent, SignupComponent],
  providers: [
    UserService
  ]
})
export class AuthModule { }
