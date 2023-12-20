import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SifbaselineheaderComponent } from './sifbaselineheader.component';

describe('SifbaselineheaderComponent', () => {
  let component: SifbaselineheaderComponent;
  let fixture: ComponentFixture<SifbaselineheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SifbaselineheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SifbaselineheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
