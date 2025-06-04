import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, Subscription, switchMap } from 'rxjs';
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
export class SearchListComponent implements OnInit, OnDestroy{
public searchQuery: string = '';
public searchResults: any[] = [];
  private searchSubject = new Subject<string>();
  private subscription!: Subscription;

  constructor(private movieService: MoviesService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.searchSubject
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
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.searchSubject.complete();
  }
}
