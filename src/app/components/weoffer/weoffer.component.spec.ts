import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WeofferComponent } from './weoffer.component';

describe('WeofferComponent', () => {
  let component: WeofferComponent;
  let fixture: ComponentFixture<WeofferComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WeofferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeofferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
