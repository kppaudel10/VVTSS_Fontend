import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPlateScanComponent } from './number-plate-scan.component';

describe('NumberPlateScanComponent', () => {
  let component: NumberPlateScanComponent;
  let fixture: ComponentFixture<NumberPlateScanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberPlateScanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberPlateScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
