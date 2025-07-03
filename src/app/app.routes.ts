import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { StocksPageComponent } from './stocks-page/stocks-page.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { StudentsComponent } from './students/students.component';
import { PaymentComponent } from './payment/payment.component';
import { FineComponent } from './fine/fine.component';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
    {path:"",component:LoginPageComponent},
    {path:"register",component:RegisterPageComponent},
  { path: 'login', component: LoginPageComponent},
    {path:"stock",component:StocksPageComponent,canActivate:[LoginGuard]},
    {path:"genre",component:HomeComponent,canActivate:[LoginGuard]},
    {path:"books",component:BooksComponent,canActivate:[LoginGuard]}, 
    {path:"reservation",component:StudentsComponent,canActivate:[LoginGuard]}, 
    {path:"payment",component:PaymentComponent,canActivate:[LoginGuard]}, 
    {path:"borrowRecords",component:FineComponent,canActivate:[LoginGuard]}, 
];
