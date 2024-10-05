import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DekoraterDijagramHistogramComponent } from './dekorater-dijagram-histogram.component';

describe('DekoraterDijagramHistogramComponent', () => {
  let component: DekoraterDijagramHistogramComponent;
  let fixture: ComponentFixture<DekoraterDijagramHistogramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DekoraterDijagramHistogramComponent]
    });
    fixture = TestBed.createComponent(DekoraterDijagramHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
