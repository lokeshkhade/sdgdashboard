import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptdifentryComponent } from './deptdifentry.component';

describe('DeptdifentryComponent', () => {
  let component: DeptdifentryComponent;
  let fixture: ComponentFixture<DeptdifentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptdifentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptdifentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
