import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportgraphComponent } from './reportgraph.component';

describe('ReportgraphComponent', () => {
  let component: ReportgraphComponent;
  let fixture: ComponentFixture<ReportgraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportgraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportgraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
