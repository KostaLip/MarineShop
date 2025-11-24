import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductDialog } from './admin-product-dialog';

describe('AdminProductDialog', () => {
  let component: AdminProductDialog;
  let fixture: ComponentFixture<AdminProductDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
