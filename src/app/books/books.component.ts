import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-books',
  imports: [FormsModule, CommonModule, MatPaginatorModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {


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
  books: any[] = [];
  



  usersService: UsersService = inject(UsersService)

  ngOnInit(): void {
    document.body.style.backgroundColor = "#f9f8fd"
    this.bookDetails();
  }


  onSearchChange(): void {
    this.bookDetails(this.searchText);
  }

  bookDetails( name?: string): void {

    const payload: any = {};
    if (name) payload.title = name;
    this.usersService.bookDetails({title: name}).subscribe({
      next: (res) => {
        console.log(res);
        this.books = res;
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      }
    });
  }
  // borrowRecords(name?: string): void {
  //   const payload: any = {};
  //   if (name) payload.user_id = name;

  //   this.usersService.borrowRecords(payload).subscribe({
  //     next: (res) => {
  //       console.log('Borrow Records:', res);
  //       this.records = res;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching borrow records:', err);
  //     }
  //   });
  // }


}
