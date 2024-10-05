import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijavaAdminComponent } from './prijava-admin.component';

describe('PrijavaAdminComponent', () => {
  let component: PrijavaAdminComponent;
  let fixture: ComponentFixture<PrijavaAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrijavaAdminComponent]
    });
    fixture = TestBed.createComponent(PrijavaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
