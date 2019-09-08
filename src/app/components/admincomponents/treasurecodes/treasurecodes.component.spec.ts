import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreasurecodesComponent } from './treasurecodes.component';

describe('TreasurecodesComponent', () => {
  let component: TreasurecodesComponent;
  let fixture: ComponentFixture<TreasurecodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreasurecodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreasurecodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
