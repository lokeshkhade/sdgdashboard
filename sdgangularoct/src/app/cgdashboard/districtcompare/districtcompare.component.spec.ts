import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictcompareComponent } from './districtcompare.component';

describe('DistrictcompareComponent', () => {
  let component: DistrictcompareComponent;
  let fixture: ComponentFixture<DistrictcompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictcompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictcompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
