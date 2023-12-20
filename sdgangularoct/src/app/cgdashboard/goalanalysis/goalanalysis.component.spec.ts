import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalanalysisComponent } from './goalanalysis.component';

describe('GoalanalysisComponent', () => {
  let component: GoalanalysisComponent;
  let fixture: ComponentFixture<GoalanalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalanalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalanalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
