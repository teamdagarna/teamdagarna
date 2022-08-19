import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyapplicationComponent } from './companyapplication.component';

describe('CompanyapplicationComponent', () => {
  let component: CompanyapplicationComponent;
  let fixture: ComponentFixture<CompanyapplicationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
