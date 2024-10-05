import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijavaComponent } from './prijava.component';

describe('PrijavaComponent', () => {
  let component: PrijavaComponent;
  let fixture: ComponentFixture<PrijavaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrijavaComponent]
    });
    fixture = TestBed.createComponent(PrijavaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
