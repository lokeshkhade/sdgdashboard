import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptsifentryComponent } from './deptsifentry.component';

describe('DeptsifentryComponent', () => {
  let component: DeptsifentryComponent;
  let fixture: ComponentFixture<DeptsifentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptsifentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptsifentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
