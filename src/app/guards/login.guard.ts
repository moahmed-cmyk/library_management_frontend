import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard  {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('userLoginDetail') || '{}');
    if (user && user.account === true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }



}

