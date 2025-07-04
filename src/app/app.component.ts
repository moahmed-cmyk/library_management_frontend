import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { StocksPageComponent } from "./stocks-page/stocks-page.component";
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
    standalone: true,
  imports: [RouterOutlet, StocksPageComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'my-angular-app';

  isSidebarClosed = false;

   authService: AuthService = inject(AuthService)

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

    constructor(public router: Router) {}

  shouldShowStocksPage(): boolean {
    return !(this.router.url === '/' || this.router.url === '/login' || this.router.url === '/register');
  }

  shouldShowLayout(): boolean {
  const url = this.router.url;
  return !(url === '/' || url === '/login' || url === '/register');
}


  isAuthPage(): boolean {
    return this.router.url === '/' || this.router.url === '/login' || this.router.url === '/register';
  }

  ngOnInit(){
    const user=JSON.parse(localStorage.getItem('userLoginDetail') || '{}')
    if(user.user.account===true){
      this.authService.setUser(user)
      if(this.router.url==='/'||this.router.url==='/login'){
        this.router.navigate(['/genre'])
      }

    }else{
      this.router.navigate(['/login'])
    }

  }

}
