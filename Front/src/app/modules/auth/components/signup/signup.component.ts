import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: any = {
    name: '',
    mail: '',
    password: '',
  };

  repeatedPassword = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  async signUp() {
    if(
      !this.user.name.trim()
      || !this.user.mail.trim()
      || !this.user.password.trim()
      || !this.repeatedPassword.trim()
    ) {
      alert('Llena todos los campos');
      return;
    }

    if(this.user.password !== this.repeatedPassword){
      alert('Las contraseñas no son iguales');
      return;
    }
    try {
      const response = await this.authService.signUp({...this.user});
      console.log(response);
      this.router.navigate(['/auth/login']);
    } catch (err) {
      console.log(err);
    }
  }

}
