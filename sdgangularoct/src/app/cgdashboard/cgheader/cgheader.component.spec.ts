import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgheaderComponent } from './cgheader.component';

describe('CgheaderComponent', () => {
  let component: CgheaderComponent;
  let fixture: ComponentFixture<CgheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CgheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CgheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
