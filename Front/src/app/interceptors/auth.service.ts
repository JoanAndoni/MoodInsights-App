import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService,
  ) { }

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.getUserToken();

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", token)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}