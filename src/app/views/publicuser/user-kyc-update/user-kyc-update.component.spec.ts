import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKycUpdateComponent } from './user-kyc-update.component';

describe('UserKycUpdateComponent', () => {
  let component: UserKycUpdateComponent;
  let fixture: ComponentFixture<UserKycUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserKycUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserKycUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
