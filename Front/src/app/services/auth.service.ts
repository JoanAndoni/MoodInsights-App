import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private userService: UserService,
  ) { }

  isAuthenticated() {
    const userInfo = this.userService.getUser();

    if (!userInfo) {
      return false;
    }

    const { token } = userInfo;

    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  async signOut() {
    this.userService.removeUser();
  }

  public signIn(email, password): Observable<any> {
    return this.http.post('http://localhost:3500/authenticate', { 'mail': email, 'password': password });
  }

  public signUp(newUser) {
    return this.http.post('http://localhost:3500/register', newUser).toPromise()
  }
}
