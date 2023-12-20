import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictdashboardComponent } from './districtdashboard.component';

describe('DistrictdashboardComponent', () => {
  let component: DistrictdashboardComponent;
  let fixture: ComponentFixture<DistrictdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
