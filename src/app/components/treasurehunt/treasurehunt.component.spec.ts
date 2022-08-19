import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasurehuntComponent } from './treasurehunt.component';

describe('TreasurehuntComponent', () => {
  let component: TreasurehuntComponent;
  let fixture: ComponentFixture<TreasurehuntComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TreasurehuntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasurehuntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
