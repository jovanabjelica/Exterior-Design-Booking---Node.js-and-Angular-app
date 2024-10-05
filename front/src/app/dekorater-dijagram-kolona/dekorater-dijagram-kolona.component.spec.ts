import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DekoraterDijagramKolonaComponent } from './dekorater-dijagram-kolona.component';

describe('DekoraterDijagramKolonaComponent', () => {
  let component: DekoraterDijagramKolonaComponent;
  let fixture: ComponentFixture<DekoraterDijagramKolonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DekoraterDijagramKolonaComponent]
    });
    fixture = TestBed.createComponent(DekoraterDijagramKolonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
