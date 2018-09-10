import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanycodesComponent } from './companycodes.component';

describe('CompanycodesComponent', () => {
  let component: CompanycodesComponent;
  let fixture: ComponentFixture<CompanycodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanycodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanycodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
