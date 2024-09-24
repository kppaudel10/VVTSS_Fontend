import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraficFlowPredictionComponent } from './trafic-flow-prediction.component';

describe('TraficFlowPredictionComponent', () => {
  let component: TraficFlowPredictionComponent;
  let fixture: ComponentFixture<TraficFlowPredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraficFlowPredictionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraficFlowPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
