import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewapplicationComponent } from './interviewapplication.component';

describe('InterviewapplicationComponent', () => {
  let component: InterviewapplicationComponent;
  let fixture: ComponentFixture<InterviewapplicationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewapplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewapplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
