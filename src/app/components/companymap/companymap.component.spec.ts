import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanymapComponent } from './companymap.component';

describe('CompanymapComponent', () => {
  let component: CompanymapComponent;
  let fixture: ComponentFixture<CompanymapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanymapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanymapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
