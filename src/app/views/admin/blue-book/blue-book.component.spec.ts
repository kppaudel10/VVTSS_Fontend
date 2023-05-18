import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueBookComponent } from './blue-book.component';

describe('BlueBookComponent', () => {
  let component: BlueBookComponent;
  let fixture: ComponentFixture<BlueBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlueBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlueBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
