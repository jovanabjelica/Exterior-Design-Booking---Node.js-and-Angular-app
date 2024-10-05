import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlasnikFirmaLokacijaComponent } from './vlasnik-firma-lokacija.component';

describe('VlasnikFirmaLokacijaComponent', () => {
  let component: VlasnikFirmaLokacijaComponent;
  let fixture: ComponentFixture<VlasnikFirmaLokacijaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VlasnikFirmaLokacijaComponent]
    });
    fixture = TestBed.createComponent(VlasnikFirmaLokacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
