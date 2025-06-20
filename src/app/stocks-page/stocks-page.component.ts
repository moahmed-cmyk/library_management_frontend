import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-stocks-page',
  imports: [FormsModule, CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './stocks-page.component.html',
  styleUrl: './stocks-page.component.css'
})
export class StocksPageComponent {
selected: string = '';

ngOnInit() {
  const saved = localStorage.getItem('selectedMenu');
  if (saved) {
    this.selected = saved;
  }
}


selectItem(item: string) {
  this.selected = item;
  localStorage.setItem('selectedMenu', item);
}

}
