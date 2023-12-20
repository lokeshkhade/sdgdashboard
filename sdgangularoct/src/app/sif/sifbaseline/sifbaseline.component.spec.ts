import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SifbaselineComponent } from './sifbaseline.component';

describe('SifbaselineComponent', () => {
  let component: SifbaselineComponent;
  let fixture: ComponentFixture<SifbaselineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SifbaselineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SifbaselineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
