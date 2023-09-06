import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { exsiteccompetitionComponent } from './exsiteccompetition.component';

describe('exsiteccompetitionComponent', () => {
  let component: exsiteccompetitionComponent;
  let fixture: ComponentFixture<exsiteccompetitionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ exsiteccompetitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(exsiteccompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
