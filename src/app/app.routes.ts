import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { StocksPageComponent } from './stocks-page/stocks-page.component';

export const routes: Routes = [
    {path:"",component:StocksPageComponent},
    {path:"login",component:LoginPageComponent},
    {path:"register",component:RegisterPageComponent}
];
