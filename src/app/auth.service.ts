import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router: any;
  isAdmin() {
    throw new Error('Method not implemented.');
  }
  private currentUser: any;

  setUser(user: any): void {
    this.currentUser = user;
  }

  getUser(): any {
    return this.currentUser;
  }

  getLoggedInUser() {
    const userData = localStorage.getItem('userLoginDetail');
    return userData ? JSON.parse(userData) : null;

  }

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('userLoginDetail') || '{}');
    if (user && user.account === true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  getToken(): string {
    return this.currentUser?.token;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }

}
