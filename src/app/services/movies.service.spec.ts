import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MoviesService } from './movies.service';
import { HttpResponse } from '@angular/common/http';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;
  const apiKey = '270f2a97ad9df0935dcb21b9e3a15c1c';
  const apiUrl = 'https://api.themoviedb.org/3';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MoviesService]
    });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getMovies with correct URL for feelGood', () => {
    service.getMovies(1, 'feelGood').subscribe();

    const req = httpMock.expectOne(`${apiUrl}/movie/popular?api_key=${apiKey}&page=1&language=en-US`);
    expect(req.request.method).toBe('GET');
    req.event(new HttpResponse({ body: {} }));
  });

  it('should call getMovies with correct URL for actionFix', () => {
    service.getMovies(2, 'actionFix').subscribe();

    const req = httpMock.expectOne(`${apiUrl}/movie/now_playing?api_key=${apiKey}&page=2&language=en-US`);
    expect(req.request.method).toBe('GET');
    req.event(new HttpResponse({ body: {} }));
  });

  it('should call getMovies with correct URL for mindBenders', () => {
    service.getMovies(3, 'mindBenders').subscribe();
    const req = httpMock.expectOne(`${apiUrl}/movie/top_rated?api_key=${apiKey}&page=3&language=en-US`);
    expect(req.request.method).toBe('GET');
    req.event(new HttpResponse({ body: {} }));
  });

  it('should call getMovieDetails with correct URL', () => {
    const id = 123;
    service.getMovieDetails(id).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/movie/${id}?api_key=${apiKey}`);
    expect(req.request.method).toBe('GET');
    req.event(new HttpResponse({ body: {} }));
  });

  it('should call searchMovies with correct URL and params', () => {
    const query = 'Interstellar';
    service.searchMovies(query).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/search/movie?api_key=${apiKey}&query=${query}&language=en-US`);
    expect(req.request.method).toBe('GET');
   req.event(new HttpResponse({ body: {} }));
  });
});
