import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDekoraterComponent } from './admin-dekorater.component';

describe('AdminDekoraterComponent', () => {
  let component: AdminDekoraterComponent;
  let fixture: ComponentFixture<AdminDekoraterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDekoraterComponent]
    });
    fixture = TestBed.createComponent(AdminDekoraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
