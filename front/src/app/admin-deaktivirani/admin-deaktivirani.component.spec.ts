import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeaktiviraniComponent } from './admin-deaktivirani.component';

describe('AdminDeaktiviraniComponent', () => {
  let component: AdminDeaktiviraniComponent;
  let fixture: ComponentFixture<AdminDeaktiviraniComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDeaktiviraniComponent]
    });
    fixture = TestBed.createComponent(AdminDeaktiviraniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
