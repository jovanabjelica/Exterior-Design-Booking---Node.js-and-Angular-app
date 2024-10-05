import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlasnikFirmeComponent } from './vlasnik-firme.component';

describe('VlasnikFirmeComponent', () => {
  let component: VlasnikFirmeComponent;
  let fixture: ComponentFixture<VlasnikFirmeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VlasnikFirmeComponent]
    });
    fixture = TestBed.createComponent(VlasnikFirmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
