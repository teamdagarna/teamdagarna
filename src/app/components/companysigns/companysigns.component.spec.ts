import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanysignsComponent } from './companysigns.component';

describe('CompanysignsComponent', () => {
  let component: CompanysignsComponent;
  let fixture: ComponentFixture<CompanysignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanysignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanysignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
