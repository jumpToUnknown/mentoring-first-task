import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {UsersListComponent} from "./components/users-list/users-list.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatAnchor} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterLink,
    UsersListComponent,
    MatDialogModule,
    MatAnchor,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'mentoring-first-project';
}
