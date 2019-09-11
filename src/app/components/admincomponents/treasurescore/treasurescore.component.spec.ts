import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasurescoreComponent } from './treasurescore.component';

describe('TreasurescoreComponent', () => {
  let component: TreasurescoreComponent;
  let fixture: ComponentFixture<TreasurescoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreasurescoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasurescoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
