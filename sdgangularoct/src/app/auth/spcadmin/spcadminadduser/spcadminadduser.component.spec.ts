import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpcadminadduserComponent } from './spcadminadduser.component';

describe('SpcadminadduserComponent', () => {
  let component: SpcadminadduserComponent;
  let fixture: ComponentFixture<SpcadminadduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpcadminadduserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpcadminadduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
