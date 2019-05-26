import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdesignComponent } from './newdesign.component';

describe('NewdesignComponent', () => {
  let component: NewdesignComponent;
  let fixture: ComponentFixture<NewdesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewdesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
