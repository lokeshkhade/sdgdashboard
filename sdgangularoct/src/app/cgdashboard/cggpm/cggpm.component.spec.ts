import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CggpmComponent } from './cggpm.component';

describe('CggpmComponent', () => {
  let component: CggpmComponent;
  let fixture: ComponentFixture<CggpmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CggpmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CggpmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
