import { Component, inject, NgModule, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {

  allData = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
  paginatedData: string[] = [];

  // Paginator settings
  length = 100;
  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  router: Router = inject(Router);

  users: any[] = []
  records: any[] = []
  searchText: string = '';
  dataSource: any[] = [];
  allRecords: any[] = [];

  

  usersService: UsersService = inject(UsersService)
  authService: AuthService = inject(AuthService)

  ngOnInit(): void {
    document.body.style.backgroundColor = "#f9f8fd"
    this.borrowRecords();
    this.paginator.page.subscribe((event: PageEvent) => {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.loadData();
    });
  }
  loadData() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.allData.slice(start, end);
  }

  onSearchChange(): void {
    this.borrowRecords(this.searchText);
  }

  getUserDetail(): void {
    this.usersService.getUserDetail({}).subscribe({
      next: (res) => {
        console.log(res);
        this.users = res;
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      }
    });
  }
  borrowRecords(name?: string): void {
    const payload: any = {};
    if (name) payload.user_id = name;

    this.usersService.borrowRecords(payload).subscribe({
      next: (res) => {
        console.log('Borrow Records:', res);
        this.records = res;
      },
      error: (err) => {
        console.error('Error fetching borrow records:', err);
      }
    });
  }

}
