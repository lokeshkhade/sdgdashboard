import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistricttemplateComponent } from './districttemplate.component';

describe('DistricttemplateComponent', () => {
  let component: DistricttemplateComponent;
  let fixture: ComponentFixture<DistricttemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistricttemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistricttemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
