import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOpportunitiesComponent } from './jobopportunities.component';

describe('JobOpportunitiesComponent', () => {
  let component: JobOpportunitiesComponent;
  let fixture: ComponentFixture<JobOpportunitiesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JobOpportunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
