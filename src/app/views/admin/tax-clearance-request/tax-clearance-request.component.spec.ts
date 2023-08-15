import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxClearanceRequestComponent } from './tax-clearance-request.component';

describe('TaxClearanceRequestComponent', () => {
  let component: TaxClearanceRequestComponent;
  let fixture: ComponentFixture<TaxClearanceRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxClearanceRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxClearanceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
