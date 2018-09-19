import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewscheduleComponent } from './interviewschedule.component';

describe('InterviewscheduleComponent', () => {
  let component: InterviewscheduleComponent;
  let fixture: ComponentFixture<InterviewscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
