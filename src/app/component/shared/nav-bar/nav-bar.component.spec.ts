import { NavBarComponent } from './nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesService } from '../../../services/movies.service';
import { ActivatedRoute, RouterEvent } from '@angular/router';

const mockMoviesService = {
  getMovies: jasmine.createSpy('getMovies'),
};
const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavBarComponent,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        FormsModule
      ],
      providers: [
        { provide: MoviesService, useValue: mockMoviesService },
        { provide: RouterEvent, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});