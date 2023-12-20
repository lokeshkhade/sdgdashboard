import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgsvgComponent } from './cgsvg.component';

describe('CgsvgComponent', () => {
  let component: CgsvgComponent;
  let fixture: ComponentFixture<CgsvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CgsvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CgsvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
