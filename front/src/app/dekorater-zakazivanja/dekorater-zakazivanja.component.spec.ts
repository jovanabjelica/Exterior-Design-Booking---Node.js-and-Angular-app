import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DekoraterZakazivanjaComponent } from './dekorater-zakazivanja.component';

describe('DekoraterZakazivanjaComponent', () => {
  let component: DekoraterZakazivanjaComponent;
  let fixture: ComponentFixture<DekoraterZakazivanjaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DekoraterZakazivanjaComponent]
    });
    fixture = TestBed.createComponent(DekoraterZakazivanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
