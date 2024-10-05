import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DekoraterProfilComponent } from './dekorater-profil.component';

describe('DekoraterProfilComponent', () => {
  let component: DekoraterProfilComponent;
  let fixture: ComponentFixture<DekoraterProfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DekoraterProfilComponent]
    });
    fixture = TestBed.createComponent(DekoraterProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
