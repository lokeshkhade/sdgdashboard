import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictgoalcompareComponent } from './districtgoalcompare.component';

describe('DistrictgoalcompareComponent', () => {
  let component: DistrictgoalcompareComponent;
  let fixture: ComponentFixture<DistrictgoalcompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictgoalcompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictgoalcompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
