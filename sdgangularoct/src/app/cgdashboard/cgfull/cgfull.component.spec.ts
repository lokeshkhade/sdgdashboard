import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgfullComponent } from './cgfull.component';

describe('CgfullComponent', () => {
  let component: CgfullComponent;
  let fixture: ComponentFixture<CgfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CgfullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CgfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
