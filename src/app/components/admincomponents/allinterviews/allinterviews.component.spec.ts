import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllinterviewsComponent } from './allinterviews.component';

describe('AllinterviewsComponent', () => {
  let component: AllinterviewsComponent;
  let fixture: ComponentFixture<AllinterviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllinterviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllinterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
