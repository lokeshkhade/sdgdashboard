import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainfullComponent } from './mainfull.component';

describe('MainfullComponent', () => {
  let component: MainfullComponent;
  let fixture: ComponentFixture<MainfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainfullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
