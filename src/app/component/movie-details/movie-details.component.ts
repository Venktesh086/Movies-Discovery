import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movies } from '../../model/movies.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatPaginatorModule,
    MatIconModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit, OnDestroy{
 public movie!: Movies;
 public loading = false;
 private subscription!: Subscription
  constructor( private route: ActivatedRoute,
    private movieService: MoviesService) {}
  ngOnInit(): void {
      this.route.params.subscribe((params) => {
      const movieId = +params['id'];
      this.showMovieDetails(movieId);
    });
  }
showMovieDetails(id: number): void {
    this.loading = true;
   this.subscription = this.movieService.getMovieDetails(id).subscribe({
      next: (movieDetails) => {
        this.movie = movieDetails;
        this.loading = false;
      },
      error: (error) => {
        console.error('Getting Error while  loading movie details', error);
        this.loading = false;
      },
    });
  }

  goBack(): void {
    window.history.back();
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
