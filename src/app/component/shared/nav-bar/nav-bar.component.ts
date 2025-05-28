import { Component } from '@angular/core';
import { SearchListComponent } from '../../search-list/search-list.component';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(private dialog: MatDialog, private router: Router){}
 movieSearch() {
    this.dialog.open(SearchListComponent, {
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '90vh',
    });
  }
}
