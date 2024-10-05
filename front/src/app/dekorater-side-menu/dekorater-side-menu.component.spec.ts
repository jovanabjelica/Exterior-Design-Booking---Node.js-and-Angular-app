import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DekoraterSideMenuComponent } from './dekorater-side-menu.component';

describe('DekoraterSideMenuComponent', () => {
  let component: DekoraterSideMenuComponent;
  let fixture: ComponentFixture<DekoraterSideMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DekoraterSideMenuComponent]
    });
    fixture = TestBed.createComponent(DekoraterSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
