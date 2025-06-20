import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  getToken(): string {
    return this.currentUser?.token;
  }
  
}
