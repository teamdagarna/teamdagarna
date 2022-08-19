import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritecompaniesComponent } from './favouritecompanies.component';

describe('FavouritecompaniesComponent', () => {
  let component: FavouritecompaniesComponent;
  let fixture: ComponentFixture<FavouritecompaniesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritecompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritecompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
