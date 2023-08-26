import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldpiecesComponent } from './goldpieces.component';

describe('GoldpiecesComponent', () => {
  let component: GoldpiecesComponent;
  let fixture: ComponentFixture<GoldpiecesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GoldpiecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldpiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
