import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgdistricttableComponent } from './cgdistricttable.component';

describe('CgdistricttableComponent', () => {
  let component: CgdistricttableComponent;
  let fixture: ComponentFixture<CgdistricttableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CgdistricttableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CgdistricttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
