import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistratedComponent } from './registrated.component';

describe('RegistratedComponent', () => {
  let component: RegistratedComponent;
  let fixture: ComponentFixture<RegistratedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistratedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
