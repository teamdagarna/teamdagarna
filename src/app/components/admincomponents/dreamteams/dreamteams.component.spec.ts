import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DreamteamsComponent } from './dreamteams.component';

describe('DreamteamsComponent', () => {
  let component: DreamteamsComponent;
  let fixture: ComponentFixture<DreamteamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DreamteamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DreamteamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
