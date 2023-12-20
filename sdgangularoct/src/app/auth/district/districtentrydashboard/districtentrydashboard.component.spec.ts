import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictentrydashboardComponent } from './districtentrydashboard.component';

describe('DistrictentrydashboardComponent', () => {
  let component: DistrictentrydashboardComponent;
  let fixture: ComponentFixture<DistrictentrydashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistrictentrydashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictentrydashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
