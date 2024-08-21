import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasecompComponent } from './casecomp.component';

describe('CasecompComponent', () => {
  let component: CasecompComponent;
  let fixture: ComponentFixture<CasecompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasecompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasecompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
