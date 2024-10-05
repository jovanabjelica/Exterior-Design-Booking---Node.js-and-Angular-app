import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlasnikZakazivanjeComponent } from './vlasnik-zakazivanje.component';

describe('VlasnikZakazivanjeComponent', () => {
  let component: VlasnikZakazivanjeComponent;
  let fixture: ComponentFixture<VlasnikZakazivanjeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VlasnikZakazivanjeComponent]
    });
    fixture = TestBed.createComponent(VlasnikZakazivanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
