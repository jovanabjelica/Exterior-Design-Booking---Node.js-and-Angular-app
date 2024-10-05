import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DekoraterDijagramPitaComponent } from './dekorater-dijagram-pita.component';

describe('DekoraterDijagramPitaComponent', () => {
  let component: DekoraterDijagramPitaComponent;
  let fixture: ComponentFixture<DekoraterDijagramPitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DekoraterDijagramPitaComponent]
    });
    fixture = TestBed.createComponent(DekoraterDijagramPitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
