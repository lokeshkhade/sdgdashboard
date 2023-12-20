import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgallComponent } from './cgall.component';

describe('CgallComponent', () => {
  let component: CgallComponent;
  let fixture: ComponentFixture<CgallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CgallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CgallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
