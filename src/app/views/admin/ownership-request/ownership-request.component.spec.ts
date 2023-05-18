import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipRequestComponent } from './ownership-request.component';

describe('OwnershipRequestComponent', () => {
  let component: OwnershipRequestComponent;
  let fixture: ComponentFixture<OwnershipRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnershipRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnershipRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
