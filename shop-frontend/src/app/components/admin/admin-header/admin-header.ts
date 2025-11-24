import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth-service';

@Component({
  selector: 'app-admin-header',
  imports: [],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.scss'
})
export class AdminHeader {
  constructor(private router: Router,
              private auth: AuthService
  ) {}

  navigateToCategories() {
    this.router.navigate(['/admin/categories']);
  }

  navigateToUsers() {
    this.router.navigate(['/admin/users']);
  }

  navigateToProducts() {
    this.router.navigate(['/admin/products']);
  }

  navigateToOrders() {
    this.router.navigate(['/admin/orders']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
