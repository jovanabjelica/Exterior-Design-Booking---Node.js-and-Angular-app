import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlasnikFirmaComponent } from './vlasnik-firma.component';

describe('VlasnikFirmaComponent', () => {
  let component: VlasnikFirmaComponent;
  let fixture: ComponentFixture<VlasnikFirmaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VlasnikFirmaComponent]
    });
    fixture = TestBed.createComponent(VlasnikFirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
