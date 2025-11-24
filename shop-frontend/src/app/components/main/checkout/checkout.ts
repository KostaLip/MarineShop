import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartItem } from '../../../models/cart-item';
import { CartService } from '../../../services/cart-service';
import { AuthService } from '../../../services/auth/auth-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface CheckoutRequest {
  user: any;
  amount: number;
  country: string;
  city: string;
  address: string;
  cartItems: CartItem[];
}

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout implements OnInit {
  checkoutForm!: FormGroup;
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalItems: number = 0;
  isProcessing: boolean = false;
  currentUser: any = null;

  constructor(private fb: FormBuilder,
              private cartService: CartService,
              private authService: AuthService,
              private http: HttpClient,
              private router: Router) {
                this.initializeForm();
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    
    if (!this.currentUser) {
      this.router.navigate(['/login'], { 
        queryParams: { returnUrl: '/checkout' }
      });
      return;
    }

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
      this.totalItems = this.cartService.getTotalItems();
      
      if (this.cartItems.length === 0) {
        this.router.navigate(['/cart']);
      }
    });

    this.prefillUserData();
  }
  
  initializeForm() {
    this.checkoutForm = this.fb.group({
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      country: ['Serbia', Validators.required],
      additionalNotes: ['']
    });
  }

  prefillUserData() {
    if (this.currentUser) {
      if (this.currentUser.address) {
        this.checkoutForm.patchValue({
          address: this.currentUser.address,
          city: this.currentUser.city,
          country: this.currentUser.country || 'Serbia'
        });
      }
    }
  }

  async proceedToStripeCheckout() {
    if (this.checkoutForm.invalid) {
      Object.keys(this.checkoutForm.controls).forEach(key => {
        const control = this.checkoutForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.isProcessing = true;

    try {
      const formValue = this.checkoutForm.value;
      
      const checkoutRequest: CheckoutRequest = {
        user: this.currentUser,
        amount: this.totalPrice,
        country: formValue.country,
        city: formValue.city,
        address: formValue.address,
        cartItems: this.cartItems
      };

      console.log('Sending checkout request:', checkoutRequest);
      this.http.post<{ url: string }>(
      'http://localhost:8080/api/v1/payments/create-checkout-session',
      checkoutRequest
    ).subscribe({
      next: (response) => {
        console.log('Received response:', response);
        if (response && response.url) {
          localStorage.setItem('pendingOrder', JSON.stringify({
            items: this.cartItems,
            totalPrice: this.totalPrice,
            shippingInfo: formValue,
            timestamp: new Date().getTime()
          }));

          window.location.href = response.url;
        }
      },
      error: (error) => {
        console.error('Error creating checkout session:', error);
        alert('There was an error processing your checkout. Please try again.');
        this.isProcessing = false;
      }
    });

  } catch (error) {
    console.error('Error in proceedToStripeCheckout:', error);
    this.isProcessing = false;
  }
  }

  goBackToCart() {
    this.router.navigate(['/cart']);
  }

  getFormControl(path: string) {
    return this.checkoutForm.get(path);
  }

  isFieldInvalid(path: string): boolean {
    const control = this.getFormControl(path);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(path: string): string {
    const control = this.getFormControl(path);
    if (control?.errors) {
      if (control.errors['required']) return 'This field is required';
      if (control.errors['minlength']) {
        return `Minimum length is ${control.errors['minlength'].requiredLength} characters`;
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
}
