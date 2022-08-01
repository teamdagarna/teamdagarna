import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutenglishComponent } from './aboutenglish.component';

describe('AboutenglishComponent', () => {
  let component: AboutenglishComponent;
  let fixture: ComponentFixture<AboutenglishComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutenglishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutenglishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
