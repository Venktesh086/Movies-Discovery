import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchListComponent } from './search-list.component';
import { MoviesService } from '../../services/movies.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('SearchListComponent', () => {
  let component: SearchListComponent;
  let fixture: ComponentFixture<SearchListComponent>;
  let mockMoviesService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockMoviesService = {
      searchMovies: jasmine.createSpy().and.returnValue(of({ results: [{ id: 1, title: 'Movie 1', poster_path: '/img.jpg', release_date: '2022-01-01' }] }))
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [SearchListComponent],
      providers: [
        { provide: MoviesService, useValue: mockMoviesService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not trigger search for query less than 2 characters', () => {
    component.searchResults = [{ title: 'Old Movie' }];
    component.searchClickAction('a');
    expect(component.searchResults).toEqual([]);
  });

  it('should call movieService.searchMovies for valid query and populate results', fakeAsync(() => {
    component.searchClickAction('test');
    tick(300); // Simulate debounce time
    fixture.detectChanges();
    expect(mockMoviesService.searchMovies).toHaveBeenCalledWith('test');
    expect(component.searchResults.length).toBeGreaterThan(0);
  }));

  it('should navigate to movie details on selectMovie()', () => {
    const movie = { id: 123 };
    component.selectMovie(movie);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/movie', 123]);
  });
});
