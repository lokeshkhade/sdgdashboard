import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptlandingComponent } from './deptlanding.component';

describe('DeptlandingComponent', () => {
  let component: DeptlandingComponent;
  let fixture: ComponentFixture<DeptlandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptlandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
