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

  // Paginator settings
  length = 100;
  pageSize = 10;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  router: Router = inject(Router);

  searchText: string = '';
  dataSource: any[] = [];
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

  deleteGenre(id: number): void {
    if (confirm("Are you sure you want to delete this genre?")) {
      this.usersService.deleteGenre({ id }).subscribe({
        next: (res) => {
          console.log('Deleted:', res);
          this.reservationRecords();
  
        },
        error: (err) => {
          console.error('Error deleting genre:', err);
        }
      });
    }
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
  user_id: null,
  book_id: null,
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
      this.toaster.success("Reservation created!", "Success");
      this.closePopup();
      this.reservationRecords(); 
    },
    error: (err) => {
      console.error('Error creating reservation:', err);
      this.toaster.error("Failed to create reservation!", "Error");
    }
  });
}



}
