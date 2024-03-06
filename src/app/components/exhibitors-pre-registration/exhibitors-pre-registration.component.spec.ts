import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ExhibitorsPreRegistrationComponent } from './exhibitors-pre-registration.component';

describe('ExhibitorsPreRegistrationComponent', () => {
  let component: ExhibitorsPreRegistrationComponent;
  let fixture: ComponentFixture<ExhibitorsPreRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExhibitorsPreRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitorsPreRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
