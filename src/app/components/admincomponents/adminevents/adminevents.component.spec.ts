import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineventsComponent } from './adminevents.component';

describe('AdmineventsComponent', () => {
  let component: AdmineventsComponent;
  let fixture: ComponentFixture<AdmineventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmineventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmineventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
