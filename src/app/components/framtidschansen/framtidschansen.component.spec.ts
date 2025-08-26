import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FramtidschansenComponent } from './framtidschansen.component';

describe('FramtidschansenComponent', () => {
  let component: FramtidschansenComponent;
  let fixture: ComponentFixture<FramtidschansenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FramtidschansenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FramtidschansenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
