import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessTaxComponent } from './process-tax.component';

describe('ProcessTaxComponent', () => {
  let component: ProcessTaxComponent;
  let fixture: ComponentFixture<ProcessTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessTaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
