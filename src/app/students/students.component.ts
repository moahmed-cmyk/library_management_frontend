import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-students',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatPaginatorModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {


  allData = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
  paginatedData: string[] = [];

  length = 100;
  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  router: Router = inject(Router);

  searchText: string = '';
  dataSource: any[] = [];
  users: any[] = [];
  books: any[] = [];
  allRecords: any[] = [];
  genres: any[] = [];
  data: any[] = [];
  showPopup = false;
  newGenre = '';


  usersService: UsersService = inject(UsersService)
  authService: AuthService = inject(AuthService)
  toaster = inject(ToastrService)
  totalItems: any;
  reservationList: any;

  openPopup() {
    this.newGenre = '';
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  ngOnInit(): void {
    document.body.style.backgroundColor = "#f9f8fd"
    this.reservationRecords();
    this.loadUserDetail();
    this.loadBookDetail();

  }

  showEditPopup = false;
  editedGenreName = '';

  editReservation = {
    id: null as number | null,
    user_name: null as number | null,
    book_title: null as number | null,
    status: '',
    reserved_at: ''
  };

  openEditReservation(reservation: any) {
    this.editReservation = {
      id: reservation.id,
      user_name: Number(reservation.user_name),
      book_title: Number(reservation.book_title),
      status: reservation.status,
      reserved_at: reservation.reserved_at.split('T')[0] // remove time part if needed
    };
    this.showEditPopup = true;
  }

  submitReservationUpdate() {
  const { user_name, book_title, status, reserved_at, id } = this.editReservation;

  if (!user_name || !book_title || !status.trim() || !reserved_at) {
    this.toaster.error("Please fill in all fields!", "Validation Error");
    return;
  }

  this.usersService.updateReservation(this.editReservation).subscribe({
    next: (res) => {
      console.log(res);
      
      if (res.affectedRows > 0) {
        this.toaster.success("Reservation updated!", "Success");
        this.showEditPopup = false;
        this.reservationRecords(); // reload table
      } else {
        this.toaster.error("Update failed!", "Error");
      }
    },
    error: (err) => {
      console.error('Error updating reservation:', err);
      this.toaster.error("Server error!", "Error");
    }
  });
}





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

  submitUpdate() {
    if (!this.editedGenreId || !this.editedGenreName.trim()) return;

    const payload = {
      id: this.editedGenreId,
      name: this.editedGenreName.trim()
    };

    this.usersService.updateGenre(payload).subscribe({
      next: (res) => {
        console.log('Genre updated:', res);
        this.showEditPopup = false;
        this.editedGenreId = null;
        this.editedGenreName = '';
        this.reservationRecords(); // Refresh genre list
        this.toaster.success("Genre Updated successfully!", "Success");
      },
      error: (err) => {
        console.error('Error updating genre:', err);
      }
    });
  }

  submitGenre() {
    if (!this.newGenre.trim()) return;

    const payload = { name: this.newGenre.trim() };
    this.usersService.addGenre(payload).subscribe({
      next: (res) => {
        console.log('Genre added:', res);
        this.closePopup();
        this.reservationRecords();
        this.toaster.success("Genre Added successfully!", "Success");
      },
      error: (err) => {
        console.error('Error adding genre:', err);
      }
    });
  }

  onSearchChange(): void {
    this.reservationRecords(this.searchText);
  }

  reservationRecords(name?: string): void {
    const payload: any = {};
    if (name) payload.user_name = name;

    this.usersService.reservationRecords(payload).subscribe({
      next: (res) => {
        console.log('ReservationRecords:', res);
        this.data = res.data;
      },
      error: (err) => {
        console.error('Error fetching borrow records:', err);
      }
    });
  }


  newReservation = {
    user_id: '',
    book_id: '',
    status: '',
    reserved_at: ''
  };

  submitReservation() {
    const { user_id, book_id, status, reserved_at } = this.newReservation;

    if (!user_id || !book_id || !status.trim() || !reserved_at) {
      this.toaster.error("Please fill in all fields!", "Validation Error");
      return;
    }

    this.usersService.createReservation(this.newReservation).subscribe({
      next: (res) => {
        console.log("Reservation API response:", res);
        if (res.status === 'book not available') {
          this.toaster.error("Book is not available for reservation!", "Reservation Failed");
          return;
        }

        if (res.status === 'success') {
          this.toaster.success("Reservation created!", "Success");
          this.closePopup();
          this.reservationRecords();
          return;
        }

        this.toaster.error("Reservation failed. Try again.", "Error");

      },
      error: (err) => {
        console.error('Error creating reservation:', err);
        this.toaster.error("Failed to create reservation!", "Error");
      }
    });
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

}
