import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent {

  users: any[] = []
  userForm!: FormGroup
  isSubmitted: boolean = false
  age: string = ""
  showClearButton = false;
  isPasswordVisible = false;

  usersService: UsersService = inject(UsersService)
  registerForm: any;

  toaster=inject(ToastrService)
    router = inject(Router);

  registerUser(data: any): void {
    this.usersService.registerUser(data).subscribe({
      next: (res: any) => {
        console.log(res);
        this.users = res
           this.toaster.success("Registered successfully!", "Success");
        this.router.navigate(['/login']); 
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
          this.toaster.error(err.error.message || "Registration failed", "Error");

      }
    })
  }

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.userForm = this.fb.group({
      email: ['', Validators.required]
    });
    this.userForm = this.fb.group({
      password: ['', Validators.required, Validators.minLength(6)]
    });
    this.userForm = this.fb.group({
      created_at: ['', Validators.required]
    });
  }


  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  checkInput() {
    this.showClearButton = this.userForm.get('age')?.value.length > 0;
  }

  clearInput() {
    this.userForm.get('age')?.setValue('');
    this.showClearButton = false;
  }

  formBuilder: FormBuilder = inject(FormBuilder)

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      role: [null, [Validators.required]],
      created_at: [null, [Validators.required]],
    })
  }
}
