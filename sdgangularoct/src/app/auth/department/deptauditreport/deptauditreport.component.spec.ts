import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptauditreportComponent } from './deptauditreport.component';

describe('DeptauditreportComponent', () => {
  let component: DeptauditreportComponent;
  let fixture: ComponentFixture<DeptauditreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptauditreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptauditreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
