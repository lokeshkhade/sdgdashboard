import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringdashboardComponent } from './monitoringdashboard.component';

describe('MonitoringdashboardComponent', () => {
  let component: MonitoringdashboardComponent;
  let fixture: ComponentFixture<MonitoringdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringdashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitoringdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
