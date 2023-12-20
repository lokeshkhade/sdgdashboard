import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfreezrequestComponent } from './unfreezrequest.component';

describe('UnfreezrequestComponent', () => {
  let component: UnfreezrequestComponent;
  let fixture: ComponentFixture<UnfreezrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnfreezrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnfreezrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
