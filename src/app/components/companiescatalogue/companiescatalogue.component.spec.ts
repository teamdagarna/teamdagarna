import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniescatalogueComponent } from './companiescatalogue.component';

describe('CompaniescatalogueComponent', () => {
  let component: CompaniescatalogueComponent;
  let fixture: ComponentFixture<CompaniescatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniescatalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniescatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
