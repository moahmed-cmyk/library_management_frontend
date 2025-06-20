import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorServiceService {
  http: any;

  constructor() { }

  getCustomerBookingDetails(req: any): Observable<any> {
    return this.http.post('web/app/event/booking/details', req);
  }





}
