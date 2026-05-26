import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FairMapComponent } from './fairmap.component';

describe('FairMapComponent', () => {
  let component: FairMapComponent;
  let fixture: ComponentFixture<FairMapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FairMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FairMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
