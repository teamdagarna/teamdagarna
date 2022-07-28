import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincompaniesComponent } from './admincompanies.component';

describe('AdmincompaniesComponent', () => {
  let component: AdmincompaniesComponent;
  let fixture: ComponentFixture<AdmincompaniesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmincompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
