import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductportfolioComponent } from './productportfolio.component';

describe('ProductportfolioComponent', () => {
  let component: ProductportfolioComponent;
  let fixture: ComponentFixture<ProductportfolioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductportfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductportfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
