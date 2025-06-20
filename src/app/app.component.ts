import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StocksPageComponent } from "./stocks-page/stocks-page.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, StocksPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-angular-app';

  // app.component.ts
  isSidebarClosed = false;

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }

}
