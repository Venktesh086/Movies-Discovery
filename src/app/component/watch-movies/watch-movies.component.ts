import { Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movies } from '../../model/movies.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-watch-movies',
  standalone: true,
  imports: [ CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatPaginatorModule, MatButtonToggleGroup,MatButtonToggleModule, FormsModule],
  templateUrl: './watch-movies.component.html',
  styleUrl: './watch-movies.component.css'
})
export class WatchMoviesComponent implements OnInit, OnDestroy{
  public movies: Movies[] = [];
  public loading = false;
  public currentPage = 1;
  public totalItems = 0;
  public isInViewport = false;
  public pageSize = 20;
  public selectedSection = 'feelGood';
  private subscription!: Subscription;
  constructor(public moviesservice: MoviesService) {}
  ngOnInit(): void {
   this.loadMovies();
   this.setupLazyLoading();
  }
  onSectionChange(event: string){
    this.selectedSection = event;
   this.loadMovies();
  
  }
 private loadMovies(): void {
    this.loading = true;
    const pageNumber = this.currentPage + 1;

    this.subscription = this.moviesservice.getMovies(pageNumber, this.selectedSection).subscribe({
      next: (res: any) => {
        this.movies = res.results;
        this.totalItems = res.total_results;
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Getting Error while  loading movies', error);
        this.loading = false;
      },
    });
  }

private setupLazyLoading(): void {
  const callback = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
  };

 const observering = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.isInViewport = true;
        }});
    }, callback);
  document.querySelectorAll('.movies-card').forEach(card => observering.observe(card));
}

public onChangePage(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadMovies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    
  }
}
