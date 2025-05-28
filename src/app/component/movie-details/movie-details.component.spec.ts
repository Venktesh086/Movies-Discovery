import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { MoviesService } from '../../services/movies.service';
import { Movies } from '../../model/movies.model';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let mockMoviesService: jasmine.SpyObj<MoviesService>;
  let mockActivatedRoute: any;

  const dummyMovie: Movies = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/poster.jpg',
    backdrop_path: '/backdrop.jpg',
    vote_average: 8.5,
    release_date: '2022-01-01',
    overview: 'This is a test overview',
  };

  beforeEach(async () => {
    mockMoviesService = jasmine.createSpyObj('MoviesService', ['getMovieDetails']);
    mockActivatedRoute = {
      params: of({ id: 1 }),
    };

    await TestBed.configureTestingModule({
      imports: [MovieDetailsComponent],
      providers: [
        { provide: MoviesService, useValue: mockMoviesService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showMovieDetails on init with correct ID', () => {
    mockMoviesService.getMovieDetails.and.returnValue(of(dummyMovie));
    fixture.detectChanges();
    expect(mockMoviesService.getMovieDetails).toHaveBeenCalledWith(1);
    expect(component.movie).toEqual(dummyMovie);
    expect(component.loading).toBeFalse();
  });

  it('should handle error on showMovieDetails call', () => {
    const consoleSpy = spyOn(console, 'error');
    mockMoviesService.getMovieDetails.and.returnValue(throwError(() => new Error('Service error')));
    fixture.detectChanges();
    expect(consoleSpy).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
  });

  it('should call window.history.back on goBack()', () => {
    const backSpy = spyOn(window.history, 'back');
    component.goBack();
    expect(backSpy).toHaveBeenCalled();
  });
});
