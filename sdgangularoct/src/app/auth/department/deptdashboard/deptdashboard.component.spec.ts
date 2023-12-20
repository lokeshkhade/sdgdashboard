import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptdashboardComponent } from './deptdashboard.component';

describe('DeptdashboardComponent', () => {
  let component: DeptdashboardComponent;
  let fixture: ComponentFixture<DeptdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
