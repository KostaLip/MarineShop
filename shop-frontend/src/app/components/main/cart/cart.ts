import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart-service';
import { CartItem } from '../../../models/cart-item';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalItems: number = 0;


  constructor(
    private cartService: CartService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
      this.totalItems = this.cartService.getTotalItems();
      setTimeout(() => {
      this.cdr.detectChanges();
    }, 0);
    });
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  continueShopping() {
    this.router.navigate(['categories']);
  }

  checkout() {
    this.router.navigate(['checkout']);
  }

  trackByProductId(index: number, item: any): any {
    console.log(index, item);
    return item.productId;
  }
}

