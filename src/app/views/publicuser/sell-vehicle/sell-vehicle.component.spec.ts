import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellVehicleComponent } from './sell-vehicle.component';

describe('SellVehicleComponent', () => {
  let component: SellVehicleComponent;
  let fixture: ComponentFixture<SellVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellVehicleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
