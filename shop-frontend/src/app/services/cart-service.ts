import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  
  cartItems$ = this.cartItemsSubject.asObservable();
  
  constructor() {
    this.loadCartFromStorage();
  }

  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.productId === product.productID);
    
    if (existingItem) {
      if (existingItem.quantity < existingItem.maxStock) {
        existingItem.quantity++;
      }
    } else {
      const cartItem: CartItem = {
        productId: product.productID,
        productName: product.productName,
        price: product.price,
        quantity: 1,
        imageUrl: product.displayImage,
        maxStock: product.stockQuantity
      };
      this.cartItems.push(cartItem);
    }
    
    this.updateCart();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.productId !== productId);
    this.updateCart();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find(item => item.productId === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else if (quantity <= item.maxStock) {
        item.quantity = quantity;
        this.updateCart();
      }
    }
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  private updateCart() {
    this.cartItemsSubject.next([...this.cartItems]);
    this.saveCartToStorage();
  }

  private saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartItemsSubject.next([...this.cartItems]);
    }
  }
}
