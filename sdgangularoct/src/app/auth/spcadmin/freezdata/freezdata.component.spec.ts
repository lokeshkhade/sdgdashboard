import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreezdataComponent } from './freezdata.component';

describe('FreezdataComponent', () => {
  let component: FreezdataComponent;
  let fixture: ComponentFixture<FreezdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreezdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreezdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
