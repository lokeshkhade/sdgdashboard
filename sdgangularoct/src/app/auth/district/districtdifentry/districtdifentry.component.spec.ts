import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictdifentryComponent } from './districtdifentry.component';

describe('DistrictdifentryComponent', () => {
  let component: DistrictdifentryComponent;
  let fixture: ComponentFixture<DistrictdifentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictdifentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictdifentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
