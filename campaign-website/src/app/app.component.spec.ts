import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        RouterLink,
        RouterLinkActive,
        RouterOutlet,
        MatSelectModule,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the navbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-toolbar')).toBeTruthy();
    expect(compiled.querySelector('mat-toolbar span')?.textContent).toContain('Disiplina Muna');
  });

  it('should toggle the mobile menu', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isMenuOpen).toBeFalse();

    app.toggleMenu();
    expect(app.isMenuOpen).toBeTrue();

    app.toggleMenu();
    expect(app.isMenuOpen).toBeFalse();
  });
});