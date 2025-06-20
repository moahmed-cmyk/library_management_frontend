import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorServiceService {

  constructor() { }

  
  cartItemsCount = signal(this.loadCartCount());

  private loadCartCount(): number {
    return Number(localStorage.getItem('cartCount')) || 0;
  }

  updateCartCount(count?: number) {
    if (count === undefined) {
      count = this.cartItemsCount();
    }
    this.cartItemsCount.set(count);
    localStorage.setItem('cartCount', count.toString());
  }


}
