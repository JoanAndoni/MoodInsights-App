import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http : HttpClient) {
  }

  getUser() {
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  getUserToken() {
    const user = this.getUser();
    if (!user) {
      return null;
    }
    return user.token;
  }

  setUser(userReceived: User) {
    localStorage.setItem('userInfo', JSON.stringify(userReceived));
  }

  removeUser() {
    localStorage.removeItem('userInfo');
  }

  updateUser(user: User){
    return this.http.put(
      `http://localhost:3500/users/${user._id}`,
      {...user},
    ).toPromise();
  }

  connectFB(fbToken, userID) {
    return this.http.post(
      'http://localhost:3500/facebook/connect',
      {
        fbToken,
        userID,
      }
    ).toPromise();
  }

  disconnectFB() {
    return this.http.get(
      'http://localhost:3500/facebook/disconnect',
    ).toPromise();
  }

  connectSpotify() {
    return this.http.get(
      'http://localhost:3500/spotify/connect',
    ).toPromise();
  }

  disconnectSpotify() {
    return this.http.get(
      'http://localhost:3500/spotify/disconnect',
    ).toPromise();
  }

  getAnalysis() {
    return this.http.get(
      'http://localhost:3500/users/analysis',
    ).toPromise();
  }


}
