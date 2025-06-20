import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { UsersService } from "../users.service";
import { Component, inject } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  users: any[] = [];
  userForm!: FormGroup;
  isSubmitted: boolean = false;
  age: string = "";
  showClearButton = false;
  isPasswordVisible = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required]
    });
  }



  usersService: UsersService = inject(UsersService);
  authService: AuthService = inject(AuthService)




  email = '';
  password = '';


  // login() {
  //   const data = {
  //     email: this.email,
  //     password: this.password
  //   };

  //   this.usersService.loginUser(data).subscribe({
  //     next: (res: any) => {
  //       if (res.status === 200) {
  //         this.router.navigate(['/home']);
  //       } else if (res.status === 210) {
  //         alert('Password incorrect');
  //       } else if (res.status === 404) {
  //         alert('User not found');
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Login error:', err);
  //       alert('Server error occurred');
  //     }
  //   });
  // }

  loginUser(data: any): void {
    this.usersService.loginUser(data).subscribe({
      next: (res: any) => {
        console.log(res);

        if (res.token) {
          localStorage.setItem('token', res.token);  // ✅ Save token
        }

        if (res.account === true) {
          this.authService.setUser(res); // Store in memory
          this.router.navigate(['/home']);
        } else {
          alert('Login failed. Invalid account.');
        }
      },
      error: (err: HttpErrorResponse) => {
        alert('Login failed');
      }
    });
  }




  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  checkInput() {
    this.showClearButton = this.userForm.get('email')?.value.length > 0;
  }

  clearInput() {
    this.userForm.get('age')?.setValue('');
    this.showClearButton = false;
  }

  formBuilder: FormBuilder = inject(FormBuilder)

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, [Validators.required]],
      role: [null, [Validators.required]],
    })
  }


}
