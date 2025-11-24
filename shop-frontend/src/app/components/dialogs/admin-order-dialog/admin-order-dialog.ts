import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

interface Order {
  orderID: number;
  totalPrice: number;
  status: string;
  orderDate: string;
  shippingCountry: string;
  shippingCity: string;
  shippingAddress: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}

export interface DialogData {
  order?: Order;
  mode: 'edit';
}

@Component({
  selector: 'app-admin-order-dialog',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-order-dialog.html',
  styleUrl: './admin-order-dialog.scss'
})
export class AdminOrderDialog implements OnInit {
  orderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdminOrderDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ){
    this.orderForm = this.fb.group({
      status: ['', Validators.required],
      shippingCountry: ['', [Validators.required, Validators.minLength(2)]],
      shippingCity: ['', [Validators.required, Validators.minLength(2)]],
      shippingAddress: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit() {
    if (this.data.order) {
      this.orderForm.patchValue({
        status: this.data.order.status,
        shippingCountry: this.data.order.shippingCountry,
        shippingCity: this.data.order.shippingCity,
        shippingAddress: this.data.order.shippingAddress
      });
    }
  }

  get dialogTitle(): string {
    return 'Uredi Porudžbinu #' + this.data.order?.orderID;
  }

  onSubmit() {
    if (this.orderForm.valid && this.data.order) {
      const formValue = this.orderForm.value;
      const orderData: Order = {
        ...this.data.order,
        status: formValue.status,
        shippingCountry: formValue.shippingCountry,
        shippingCity: formValue.shippingCity,
        shippingAddress: formValue.shippingAddress
      };

      this.dialogRef.close({
        action: 'save',
        data: orderData
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.orderForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.orderForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'Ovo polje je obavezno';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `Minimum ${requiredLength} karaktera`;
      }
    }
    return '';
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('sr-RS', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('sr-RS');
  }
}
