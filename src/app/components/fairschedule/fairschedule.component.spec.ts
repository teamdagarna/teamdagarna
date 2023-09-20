import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FairscheduleComponent } from './fairschedule.component';

describe('FairscheduleComponent', () => {
  let component: FairscheduleComponent;
  let fixture: ComponentFixture<FairscheduleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FairscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FairscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
