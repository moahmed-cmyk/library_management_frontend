import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {



  // private apiUrl = environment.RESTBASEURL;

  authService: AuthService = inject(AuthService)



  http: HttpClient = inject(HttpClient);


  constructor() { }

  loginUser(req: any): Observable<any> {
    return this.http.post('/login', req)
  }
  registerUser(req: any): Observable<any> {
    return this.http.post('/register', req)
  }
  getUserDetail(req: any): Observable<any> {
    return this.http.post('/users', req)
  }
  borrowRecords(req: any): Observable<any> {
    return this.http.post('/borrows', req)
  }
  bookDetails(req: any): Observable<any> {
    return this.http.post('/books', req)
  }
  reservationDetails(req: any): Observable<any> {
    return this.http.post('/reservations', req)
  }




}
