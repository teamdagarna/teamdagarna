import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobcatalogueComponent } from './jobcatalogue.component';

describe('JobcatalogueComponent', () => {
  let component: JobcatalogueComponent;
  let fixture: ComponentFixture<JobcatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobcatalogueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobcatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
