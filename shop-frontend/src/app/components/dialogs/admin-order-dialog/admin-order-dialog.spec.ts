import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderDialog } from './admin-order-dialog';

describe('AdminOrderDialog', () => {
  let component: AdminOrderDialog;
  let fixture: ComponentFixture<AdminOrderDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOrderDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrderDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
