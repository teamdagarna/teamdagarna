import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanysigninComponent } from './companysignin.component';

describe('CompanysigninComponent', () => {
  let component: CompanysigninComponent;
  let fixture: ComponentFixture<CompanysigninComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanysigninComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanysigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
