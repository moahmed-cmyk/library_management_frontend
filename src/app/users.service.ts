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
  addBorrow(req: any): Observable<any> {
    return this.http.post('/borrow/add', req)
  }
  bookDetails(req: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post('/books', req, { headers });
  }
  reservationDetails(req: any): Observable<any> {
    return this.http.post('/reservations', req)
  }
  genreRecords(req: any): Observable<any> {
    return this.http.post('/genres', req)
  }
  // reservation(req: any): Observable<any> {
  //   return this.http.post('/reservations', req)
  // }
  updateBorrow(req: any): Observable<any> {
    return this.http.post('/borrow/update', req)
  }
  reservationRecords(req: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post('/reservations', req, { headers });
  }
  createReservation(req: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post('/reservation/add', req, { headers });
  }
  deleteGenre(req: any): Observable<any> {
    return this.http.post('/genre/delete', req)
  }
  deleteBook(req: any): Observable<any> {
    return this.http.post('/books/delete', req)
  }
  deleteUser(req: any): Observable<any> {
    return this.http.post('/users/delete', req)
  }
  userDetails(req: any): Observable<any> {
    return this.http.post('/users', req)
  }
  createBooks(req: any): Observable<any> {
    return this.http.post('/books/add', req)
  }
  addGenre(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post('/genre/add', data, headers);
  }
  updateGenre(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post('/genre/update', data, headers);
  }
  updateBook(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post('/books/update', data, headers);
  }
  updateUser(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post('/users/update', data, headers);
  }
  
  reservation(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    return this.http.post('/reservations', data, headers);
  }

  getBooks(filter: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('/books', filter, { headers });
  }

  genreList(filter: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('/genres', filter, { headers });
  }
  updateReservation(filter: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('/reservation/update', filter, { headers });
  }


}
