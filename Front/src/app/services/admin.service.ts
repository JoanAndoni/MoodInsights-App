import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http : HttpClient) {}

  getAllUsers(limit = 5, page = 0, sort = 'name') {
    const url = `http://localhost:3500/users?limit=${limit}&skip=${limit * page}&sort=${sort}`;
    return this.http.get(url).toPromise();
  }

  deleteUser(id) {
    return this.http.delete(
      `http://localhost:3500/users/${id}`,
    ).toPromise();
  }
}
