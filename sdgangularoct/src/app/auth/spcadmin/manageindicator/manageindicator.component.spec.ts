import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageindicatorComponent } from './manageindicator.component';

describe('ManageindicatorComponent', () => {
  let component: ManageindicatorComponent;
  let fixture: ComponentFixture<ManageindicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageindicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageindicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
