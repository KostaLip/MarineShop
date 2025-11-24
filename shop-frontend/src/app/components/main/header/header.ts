import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';
import { Router } from '@angular/router';
import { User } from '../../../services/auth/auth-service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart-service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  menuOpen = false;
  currentUser: User | null = null;

  constructor(private auth: AuthService, 
              private router: Router, 
              private cartService: CartService) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
    this.cartService.clearCart();
  }

  openHome() {
    this.router.navigate(['']);
  }

  goToOrders() {
    this.router.navigate(['orders']);
  }

  openProducts() {
    this.router.navigate(['categories']);
  }

  goToCart() {
    this.router.navigate(['cart']);
  }

  editProfile() {
    this.router.navigate(['profile']);
  }
}
