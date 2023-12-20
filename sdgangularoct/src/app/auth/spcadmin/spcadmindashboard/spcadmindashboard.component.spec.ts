import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpcadmindashboardComponent } from './spcadmindashboard.component';

describe('SpcadmindashboardComponent', () => {
  let component: SpcadmindashboardComponent;
  let fixture: ComponentFixture<SpcadmindashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpcadmindashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpcadmindashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
