import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DekoraterOdrzavanjaComponent } from './dekorater-odrzavanja.component';

describe('DekoraterOdrzavanjaComponent', () => {
  let component: DekoraterOdrzavanjaComponent;
  let fixture: ComponentFixture<DekoraterOdrzavanjaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DekoraterOdrzavanjaComponent]
    });
    fixture = TestBed.createComponent(DekoraterOdrzavanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
