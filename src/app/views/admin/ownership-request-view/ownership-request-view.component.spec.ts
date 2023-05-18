import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnershipRequestViewComponent } from './ownership-request-view.component';

describe('OwnershipRequestViewComponent', () => {
  let component: OwnershipRequestViewComponent;
  let fixture: ComponentFixture<OwnershipRequestViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnershipRequestViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnershipRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
