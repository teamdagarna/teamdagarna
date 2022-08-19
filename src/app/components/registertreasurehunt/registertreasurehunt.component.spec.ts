import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistertreasurehuntComponent } from './registertreasurehunt.component';

describe('RegistertreasurehuntComponent', () => {
  let component: RegistertreasurehuntComponent;
  let fixture: ComponentFixture<RegistertreasurehuntComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistertreasurehuntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistertreasurehuntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
