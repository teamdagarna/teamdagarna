import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincompaniesComponent } from './admincompanies.component';

describe('AdmincompaniesComponent', () => {
  let component: AdmincompaniesComponent;
  let fixture: ComponentFixture<AdmincompaniesComponent>;

  beforeEach(async(() => {
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
