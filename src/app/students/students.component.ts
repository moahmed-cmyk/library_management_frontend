import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator'
@Component({
  selector: 'app-students',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatPaginatorModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {


  allData = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
  paginatedData: string[] = [];

  // Paginator settings
  length = 100;
  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  router: Router = inject(Router);


  searchText: string = '';
  dataSource: any[] = [];
  reservation: any[] = [];
  totalReservations = 0;
  



  usersService: UsersService = inject(UsersService)

  ngOnInit(): void {
    document.body.style.backgroundColor = "#f9f8fd"
    this.reservationDetails();
  }


  onSearchChange(): void {
    this.reservationDetails(this.searchText);
  }

  reservationDetails( name?: string): void {
    const payload: any = {};
    if (name) payload.user_name= name;
    this.usersService.reservationDetails(payload).subscribe({
      next: (res) => {
        console.log(res);
       this.reservation = res.data;
      this.totalReservations = res.total;
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      }
    });
  }
}
