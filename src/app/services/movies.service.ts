import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiKey: string = environment.apiKey;
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }
   getMovies(page: number,selectedSection: string): Observable<any> {
    let movies: string = '';
    if(selectedSection ==='feelGood') {
      movies='/movie/popular';
    } else if(selectedSection ==='actionFix') {
      movies='/movie/now_playing';
    } else if(selectedSection === 'mindBenders') {
      movies = '/movie/top_rated';
    }
    return this.http.get<any>(`${this.apiUrl}${movies}`, {
      params: {
        api_key: this.apiKey,
        page: page.toString(),
        language: 'en-US',
      },
    });
 }
getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query: query,
        language: 'en-US',
      },
    });
  }
 
}
