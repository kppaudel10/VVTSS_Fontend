import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberPlateScanProcessComponent } from './number-plate-scan-process.component';

describe('NumberPlateScanProcessComponent', () => {
  let component: NumberPlateScanProcessComponent;
  let fixture: ComponentFixture<NumberPlateScanProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberPlateScanProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberPlateScanProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
