import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptadduserComponent } from './deptadduser.component';

describe('DeptadduserComponent', () => {
  let component: DeptadduserComponent;
  let fixture: ComponentFixture<DeptadduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptadduserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptadduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
