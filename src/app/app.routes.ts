import { Routes } from '@angular/router';
import { WatchMoviesComponent } from './component/watch-movies/watch-movies.component';

export const routes: Routes = [
      {
    path: '', 
    loadComponent: () => import('./component/watch-movies/watch-movies.component').then(
  (m)=> m.WatchMoviesComponent)
},
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./component/movie-details/movie-details.component').then(
        (m) => m.MovieDetailsComponent
      ),
  },
];
