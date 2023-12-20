import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulatedataComponent } from './populatedata.component';

describe('PopulatedataComponent', () => {
  let component: PopulatedataComponent;
  let fixture: ComponentFixture<PopulatedataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopulatedataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulatedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
