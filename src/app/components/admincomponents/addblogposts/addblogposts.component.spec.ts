import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddblogpostsComponent } from './addblogposts.component';

describe('AddblogpostsComponent', () => {
  let component: AddblogpostsComponent;
  let fixture: ComponentFixture<AddblogpostsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddblogpostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddblogpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});