import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictnotificationComponent } from './districtnotification.component';

describe('DistrictnotificationComponent', () => {
  let component: DistrictnotificationComponent;
  let fixture: ComponentFixture<DistrictnotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictnotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
