import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserDialog } from './admin-user-dialog';

describe('AdminUserDialog', () => {
  let component: AdminUserDialog;
  let fixture: ComponentFixture<AdminUserDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
