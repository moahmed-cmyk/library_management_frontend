import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Router, RouterLink } from '@angular/router';
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  imports: [FormsModule, CommonModule, MatPaginatorModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {



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
    genre_name: '',
    total_copies: null,
    available_copies: null,
    created_at: ''
  };
  closePopup() {
    this.showPopup = false;
  }



  totalItems: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  router: Router = inject(Router);
  submitBook() {
    const b = this.newBook;

    if (
      !b.title?.trim() ||
      !b.author_name?.trim() ||
      !b.genre_name?.trim() ||
      !b.total_copies ||
      !b.available_copies ||
      !b.created_at
    ) {
      this.toaster.error("All fields are required!", "Validation Error");
      return;
    }

    this.usersService.createBook(this.newBook).subscribe({
      next: (res) => {
        console.log('Book created:', res);

        this.closePopup();
        this.bookDetails();
        this.toaster.success("Book added successfully!", "Success");
      },
      error: (err) => {
        console.error('Error creating book:', err);
        this.toaster.error("Failed to add book!", "Error");
      }
    });
  }



  loadGenres(): void {
    const payload = { offset: 0, limit: 100 };
    this.usersService.genreList(payload).subscribe({
      next: (res) => {
        console.log('Genres loaded:', res);
        this.genres = res;
      },
      error: (err) => {
        console.error('Error fetching genres:', err);
      }
    });
  }

  deleteBook(id: number): void {
    if (confirm("Are you sure you want to delete this genre?")) {
      this.usersService.deleteBook({ id }).subscribe({
        next: (res) => {
          console.log('Deleted:', res);
          this.bookDetails();
          this.toaster.success("Book deleted successfully!", "Success");

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
    this.bookDetails();
    this.loadGenres();
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.bookDetails(this.searchText);
  }



  onSearchChange(): void {
    this.bookDetails(this.searchText);
    this.pageIndex = 0;
  }

  bookDetails(name?: string): void {
    const offset = this.pageIndex * this.pageSize;
    const limit = this.pageSize;

    const payload = {
      offset,
      limit,
      title: this.searchText || ''
    };
    if (name) payload.title = name;
    this.usersService.bookDetails({ title: name }).subscribe({
      next: (res) => {
        console.log(res);
        this.books = res;
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
    genre_name: null,
    total_copies: null,
    available_copies: null,
    created_at: ''
  };

  editBook(book: { id: null; title: string; author_name: string; genre_name: null; total_copies: null; available_copies: null; created_at: string; }) {
    this.editedBook = { ...book };  // assuming book contains all needed fields
    this.showEditPopup = true;
  }

  openPopup() {
    this.showPopup = true;
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
        this.bookDetails();
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
          this.bookDetails();

        },
        error: (err) => {
          console.error('Error deleting genre:', err);
        }
      });
    }
  }

  submitBookUpdate() {
    if (
      !this.editedBook.id ||
      !this.editedBook.title.trim() ||
      !this.editedBook.author_name.trim() ||
      !this.editedBook.genre_name ||
      !this.editedBook.total_copies ||
      !this.editedBook.available_copies ||
      !this.editedBook.created_at.trim()
    ) {
      this.toaster.error("Please fill all fields!", "Validation Error");
      return;
    }

    this.usersService.updateBook(this.editedBook).subscribe({
      next: (res) => {
        console.log('Book updated:', res);
        this.showEditPopup = false;
        this.editedBook = {
          id: null,
          title: '',
          author_name: '',
          genre_name: null,
          total_copies: null,
          available_copies: null,
          created_at: ''
        };
        this.bookDetails();
        this.toaster.success("Book Updated successfully!", "Success");
      },
      error: (err) => {
        console.error('Error updating book:', err);
        this.toaster.error("Failed to update book!", "Error");
      }
    });
  }

}
