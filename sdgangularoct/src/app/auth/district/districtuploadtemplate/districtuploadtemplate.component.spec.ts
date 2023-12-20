import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictuploadtemplateComponent } from './districtuploadtemplate.component';

describe('DistrictuploadtemplateComponent', () => {
  let component: DistrictuploadtemplateComponent;
  let fixture: ComponentFixture<DistrictuploadtemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictuploadtemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictuploadtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
