import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlasnikOdrzavanjeComponent } from './vlasnik-odrzavanje.component';

describe('VlasnikOdrzavanjeComponent', () => {
  let component: VlasnikOdrzavanjeComponent;
  let fixture: ComponentFixture<VlasnikOdrzavanjeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VlasnikOdrzavanjeComponent]
    });
    fixture = TestBed.createComponent(VlasnikOdrzavanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
