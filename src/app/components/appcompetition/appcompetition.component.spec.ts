import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppcompetitionComponent } from './appcompetition.component';

describe('AppcompetitionComponent', () => {
  let component: AppcompetitionComponent;
  let fixture: ComponentFixture<AppcompetitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppcompetitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppcompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
