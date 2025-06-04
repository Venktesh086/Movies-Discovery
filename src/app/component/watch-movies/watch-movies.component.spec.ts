import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { WatchMoviesComponent } from './watch-movies.component';
import { MoviesService } from '../../services/movies.service';
import { of, throwError,Subject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PageEvent } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('WatchMoviesComponent', () => {
  let component: WatchMoviesComponent;
  let fixture: ComponentFixture<WatchMoviesComponent>;
  let mockService: jasmine.SpyObj<MoviesService>;

    const mockMoviesResponse = {
    page: 1,
    results: [
      {
        id: 101,
        title: 'Test Movie',
        poster_path: '/poster.jpg',
        backdrop_path: '/backdrop.jpg',
        vote_average: 8.5,
        release_date: '2023-12-01',
        overview: 'A test overview for the movie.'
      }
    ],
    total_results: 1,
    total_pages: 1
  };

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('MoviesService', ['getMovies']);

    await TestBed.configureTestingModule({
      imports: [
        WatchMoviesComponent,
        HttpClientTestingModule,
        NoopAnimationsModule,
            MatCardModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatChipsModule,
      MatPaginatorModule,
      MatButtonToggleModule,
      FormsModule,
      RouterTestingModule
      ],
      providers: [
        { provide: MoviesService, useValue: serviceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WatchMoviesComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies on ngOnInit', fakeAsync(() => {
    mockService.getMovies.and.returnValue(of(mockMoviesResponse));
    fixture.detectChanges(); // triggers ngOnInit
    tick();
    fixture.detectChanges();
    expect(mockService.getMovies).toHaveBeenCalled();
    expect(component.movies.length).toBe(1);
    expect(component.totalItems).toBe(1);
    expect(component.loading).toBeFalse();
  }));

  it('should handle API error', fakeAsync(() => {
    mockService.getMovies.and.returnValue(throwError(() => new Error('API error')));
    fixture.detectChanges();
    tick();

    expect(component.movies.length).toBe(0);
    expect(component.loading).toBeFalse();
  }));

  it('should change section and reload movies', fakeAsync(() => {
    mockService.getMovies.and.returnValue(of(mockMoviesResponse));
    component.onSectionChange('mindBenders');
    tick();

    expect(component.selectedSection).toBe('mindBenders');
    expect(mockService.getMovies).toHaveBeenCalledWith(component.currentPage + 1, 'mindBenders');
  }));

  it('should change page and reload data', fakeAsync(() => {
    mockService.getMovies.and.returnValue(of(mockMoviesResponse));

    const event: PageEvent = {
      pageIndex: 2,
      pageSize: 10,
      length: 100
    };

    component.onChangePage(event);
    tick();

    expect(component.currentPage).toBe(2);
    expect(component.pageSize).toBe(10);
    expect(mockService.getMovies).toHaveBeenCalled();
  }));

  it('should render movie card in DOM', fakeAsync(() => {
    mockService.getMovies.and.returnValue(of(mockMoviesResponse));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('.movies-card'));
    expect(cards.length).toBe(1);
  }));

it('should show spinner when loading is true', waitForAsync(async () => {
  const subject = new Subject<any>();
  mockService.getMovies.and.returnValue(subject.asObservable());

  fixture.detectChanges();

  // Spinner should be present while the request is pending
  let spinner = fixture.debugElement.query(By.css('.load-spinner'));
  expect(spinner).toBeTruthy();

  // Now emit the response and complete the observable
  subject.next(mockMoviesResponse);
  subject.complete();

  await fixture.whenStable();
  fixture.detectChanges();

  // Spinner should be gone after loading is false
  spinner = fixture.debugElement.query(By.css('.load-spinner'));
  expect(spinner).toBeFalsy();
}));

});
