import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router'; 
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatPaginatorModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {

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

  newBook = {
  title: '',
  author_name: '',
  genre_id: null,
  total_copies: null,
  available_copies: null,
  created_at: ''
};



  deleteUser(id: number): void {
    if (confirm("Are you sure you want to delete this genre?")) {
      this.usersService.deleteUser({ id }).subscribe({
        next: (res) => {
          console.log('Deleted:', res);
        this.userDetails();
              this.toaster.success("User deleted successfully!", "Success");
  
        },
        error: (err) => {
          console.error('Error deleting genre:', err);
        }
      });
    }
  }

  usersService: UsersService = inject(UsersService)
  toaster = inject(ToastrService)

  ngOnInit(): void {
    document.body.style.backgroundColor = "#f9f8fd"
    this.userDetails();
  }


  onSearchChange(): void {
    this.userDetails(this.searchText);
    this.pageIndex = 0;
  }

  userDetails(name?: string): void {
    const offset = this.pageIndex * this.pageSize;
    const limit = this.pageSize;

    const payload = {
      offset,
      limit,
      name: this.searchText || ''
    };
    if (name) payload.name = name;
    this.usersService.userDetails({ name: name }).subscribe({
      next: (res) => {
        console.log(res);
        this.users = res;
        this.totalItems = res.total;
      },
      error: (err) => {
        console.error('Error fetching user details:', err);
      }
    });
  }




  editedBook = {
    id: null,
    title: '',
    author_name: '',
    genre_id: null,
    total_copies: null,
    available_copies: null,
    created_at: ''
  };

  editBook(book: { id: null; title: string; author_name: string; genre_id: null; total_copies: null; available_copies: null; created_at: string; }) {
    this.editedBook = { ...book };  // assuming book contains all needed fields
    this.showEditPopup = true;
  }

  openPopup() {
    this.newGenre = '';
    this.showPopup = true;
  }


  closePopup() {
    this.showPopup = false;
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


  submitGenre() {
    if (!this.newGenre.trim()) return;

    const payload = { name: this.newGenre.trim() };
    this.usersService.addGenre(payload).subscribe({
      next: (res) => {
        console.log('Genre added:', res);
        this.closePopup();
        this.userDetails();
        this.toaster.success("Genre Added successfully!", "Success");
      },
      error: (err) => {
        console.error('Error adding genre:', err);
      }
    });
  }

  deleteGenre(id: number): void {
    if (confirm("Are you sure you want to delete this genre?")) {
      this.usersService.deleteGenre({ id }).subscribe({
        next: (res) => {
          console.log('Deleted:', res);
          this.userDetails();

        },
        error: (err) => {
          console.error('Error deleting genre:', err);
        }
      });
    }
  }


}
