import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiasvgComponent } from './indiasvg.component';

describe('IndiasvgComponent', () => {
  let component: IndiasvgComponent;
  let fixture: ComponentFixture<IndiasvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndiasvgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiasvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
