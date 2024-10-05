import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocetnaComponent } from './pocetna.component';

describe('PocetnaComponent', () => {
  let component: PocetnaComponent;
  let fixture: ComponentFixture<PocetnaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PocetnaComponent]
    });
    fixture = TestBed.createComponent(PocetnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
