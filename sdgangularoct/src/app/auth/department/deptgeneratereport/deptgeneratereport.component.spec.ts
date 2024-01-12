import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptgeneratereportComponent } from './deptgeneratereport.component';

describe('DeptgeneratereportComponent', () => {
  let component: DeptgeneratereportComponent;
  let fixture: ComponentFixture<DeptgeneratereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptgeneratereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptgeneratereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
