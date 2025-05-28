import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./component/shared/nav-bar/nav-bar.component";
import { WatchMoviesComponent } from "./component/watch-movies/watch-movies.component";
import { MovieDetailsComponent } from './component/movie-details/movie-details.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movies-discovery';
}
