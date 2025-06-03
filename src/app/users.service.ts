import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }
  
  loginUser(req:any): Observable<any> {
    return this.http.post('/login',req)
  }
  registerUser(req:any): Observable<any> {
    return this.http.post('/register',req)
  }

  http: HttpClient = inject(HttpClient);

}
