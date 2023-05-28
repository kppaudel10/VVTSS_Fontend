import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellVehicleDetailsComponent } from './sell-vehicle-details.component';

describe('SellVehicleDetailsComponent', () => {
  let component: SellVehicleDetailsComponent;
  let fixture: ComponentFixture<SellVehicleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellVehicleDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellVehicleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
