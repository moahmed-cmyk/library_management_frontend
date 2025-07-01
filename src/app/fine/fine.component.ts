import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fine',
  imports: [FormsModule, CommonModule, MatPaginatorModule],
  templateUrl: './fine.component.html',
  styleUrl: './fine.component.css'
})
export class FineComponent {


  allData = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
  paginatedData: string[] = [];

  // Paginator settings
  totalItems: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  router: Router = inject(Router);

  users: any[] = []
  records: any[] = []
  searchText: string = '';
  dataSource: any[] = [];
  books: any[] = [];
  genres: any[] = [];
  showPopup = false;
  newGenre = '';

  newBorrow = {
    user_id: '',
    book_id: '',
    issue_date: '',
    due_date: '',
    return_date: '',
    fine_amount: null as number | null
  };

  submitBorrow() {
    const { user_id, book_id, issue_date, due_date, return_date } = this.newBorrow;

    if (!user_id || !book_id || !issue_date || !due_date) {
      this.toaster.error("Please fill all required fields!", "Validation Error");
      return;
    }

    const issue = new Date(issue_date);
    const due = new Date(due_date);
    const ret = return_date ? new Date(return_date) : null;

    let fine = 0;
    if (ret && ret > due) {
      const diffTime = ret.getTime() - due.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 15) {
        fine = 500;
      }
    }

    this.newBorrow.fine_amount = fine;

    this.usersService.addBorrow(this.newBorrow).subscribe({

      next: (res) => {
        console.log(this.newBorrow);
        console.log('Borrow record added:', res);

        if (res.status === 'book is not available') {
          this.toaster.error("Book is not available!", "Borrow Failed");
          return;
        }
        
        this.closePopup();
        this.borrowRecords();
        this.toaster.success("Borrow record added!", "Success");
      },
      error: (err) => {
        console.error('Error:', err);
        this.toaster.error("Failed to add record!", "Error");
      }
    });
  }



  usersService: UsersService = inject(UsersService)
  toaster = inject(ToastrService)

  ngOnInit(): void {
    document.body.style.backgroundColor = "#f9f8fd"
    this.borrowRecords();
    this.loadUserRecord();
    this.loadBookDetail();
  }

  loadUserRecord(): void {
    const payload = { offset: 0, limit: 100 };
    this.usersService.userDetails(payload).subscribe({
      next: (res) => {
        console.log('users loaded:', res);
        this.users = res;
      },
      error: (err) => {
        console.error('Error fetching genres:', err);
      }
    });
  }
  loadBookDetail(): void {
    const payload = { offset: 0, limit: 100 };
    this.usersService.bookDetails(payload).subscribe({
      next: (res) => {
        console.log('books loaded:', res);
        this.books = res;
      },
      error: (err) => {
        console.error('Error fetching genres:', err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.borrowRecords(this.searchText);
  }



  onSearchChange(): void {
    this.borrowRecords(this.searchText);
    this.pageIndex = 0;
  }

  borrowRecords(name?: string): void {
    const offset = this.pageIndex * this.pageSize;
    const limit = this.pageSize;

    const payload = {
      offset,
      limit,
      user_id: this.searchText || ''
    };
    if (name) payload.user_id = name;
    this.usersService.borrowRecords({ user_id: name }).subscribe({
      next: (res) => {
        console.log(res);
        this.records = res;
        this.totalItems = res.total;
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      }
    });
  }
  editBorrow = {
    user_id: null,
    book_id: null,
    issue_date: '',
    due_date: '',
    return_date: '',
    fine_amount: null
  };

  openPopup() {
    this.newGenre = '';
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.showEditPopup = false;
  }

  showEditPopup = false;
  editedGenreName = '';

  editedGenreId: number | null = null;


  editGenre(id: number, name: string) {
    this.editedGenreId = id;
    this.editedGenreName = name;
    this.showEditPopup = true;
  }

  cancelEdit() {
    this.showEditPopup = false;
    this.editedGenreId = null;
    this.editedGenreName = '';
  }


  editBorrowRecord(item: any) {
    this.editBorrow = {
      ...item,
      issue_date: item.issue_date?.substring(0, 10),
      due_date: item.due_date?.substring(0, 10),
      return_date: item.return_date?.substring(0, 10) || '',
    };
    this.showEditPopup = true;
  }


  submitUpdate() {
    this.usersService.updateBorrow(this.editBorrow).subscribe({
      next: (res) => {
        this.toaster.success("Borrow record updated!");
        this.closePopup();
        this.borrowRecords();
      },
      error: (err) => {
        console.error(err);
        this.toaster.error("Failed to update record");
      }
    });
  }


  deleteGenre(id: number): void {
    if (confirm("Are you sure you want to delete this genre?")) {
      this.usersService.deleteGenre({ id }).subscribe({
        next: (res) => {
          console.log('Deleted:', res);
          this.borrowRecords();

        },
        error: (err) => {
          console.error('Error deleting genre:', err);
        }
      });
    }
  }

  loadUserDetail(): void {
    const payload = { offset: 0, limit: 100 };
    this.usersService.userDetails(payload).subscribe({
      next: (res) => {
        console.log('Genres loaded:', res);
        this.users = res;
      },
      error: (err) => {
        console.error('Error fetching genres:', err);
      }
    });
  }

}
