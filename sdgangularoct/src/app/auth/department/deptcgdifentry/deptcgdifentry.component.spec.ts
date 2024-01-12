import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptcgdifentryComponent } from './deptcgdifentry.component';

describe('DeptcgdifentryComponent', () => {
  let component: DeptcgdifentryComponent;
  let fixture: ComponentFixture<DeptcgdifentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptcgdifentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptcgdifentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
