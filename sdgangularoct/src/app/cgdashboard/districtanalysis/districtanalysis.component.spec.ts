import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictanalysisComponent } from './districtanalysis.component';

describe('DistrictanalysisComponent', () => {
  let component: DistrictanalysisComponent;
  let fixture: ComponentFixture<DistrictanalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictanalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
