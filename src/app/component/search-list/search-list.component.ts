import { Component } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatCardModule, MatButtonModule, FormsModule, MatIconModule, MatFormFieldModule, MatInputModule,  MatProgressSpinnerModule,
    MatChipsModule,
    MatPaginatorModule,
    MatIconModule,],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.css'
})
export class SearchListComponent {
public searchQuery = '';
public searchResults: any[] = [];
  private searchSubject = new Subject<string>();

  constructor(private movieService: MoviesService, private router: Router) {}

  ngOnInit() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.movieService.searchMovies(query))
      )
      .subscribe((results) => {
        this.searchResults = results.results;
      });
  }

  searchClickAction(query: string) {
    if (query.length >= 2) {
      this.searchSubject.next(query);
    } else {
      this.searchResults = [];
    }
  }

  selectMovie(movie: any) {
    this.router.navigate(['/movie', movie.id]);
  }
}
