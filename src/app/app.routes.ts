import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { StocksPageComponent } from './stocks-page/stocks-page.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { StudentsComponent } from './students/students.component';

export const routes: Routes = [
    {path:"",component:LoginPageComponent},
    {path:"register",component:RegisterPageComponent},
    {path:"login",component:LoginPageComponent},
    {path:"stock",component:StocksPageComponent},
    {path:"home",component:HomeComponent},
    {path:"books",component:BooksComponent}, 
    {path:"students",component:StudentsComponent}, 
];
