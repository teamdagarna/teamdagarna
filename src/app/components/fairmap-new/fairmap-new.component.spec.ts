import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FairMapNewComponent } from './fairmap-new.component';

describe('FairmapNewComponent', () => {
  let component: FairMapNewComponent;
  let fixture: ComponentFixture<FairMapNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FairMapNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FairMapNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
