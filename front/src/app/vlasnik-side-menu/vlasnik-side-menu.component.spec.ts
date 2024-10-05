import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VlasnikSideMenuComponent } from './vlasnik-side-menu.component';

describe('VlasnikSideMenuComponent', () => {
  let component: VlasnikSideMenuComponent;
  let fixture: ComponentFixture<VlasnikSideMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VlasnikSideMenuComponent]
    });
    fixture = TestBed.createComponent(VlasnikSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
