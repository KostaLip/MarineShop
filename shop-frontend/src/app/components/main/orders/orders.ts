import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth-service';


interface Order {
  orderID: number;
  totalPrice: number;
  status: string;
  orderDate: string;
  shippingCountry: string;
  shippingCity: string;
  shippingAddress: string;
}

@Component({
  selector: 'app-orders',
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss'
})
export class Orders  implements OnInit{
  orders: Order[] = [];
  loading: boolean = true;
  currentUser: any = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadOrders();
  }

  loadOrders() {
    this.http.get<Order[]>(`http://localhost:8080/api/v1/order/user/${this.currentUser.userID}`, {withCredentials: true})
      .subscribe({
        next: (orders) => {
          this.orders = orders.sort((a, b) => 
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          );
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading orders:', error);
          this.loading = false;
        }
      });
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

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'status-paid';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  }

  goBack() {
    this.router.navigate(['/categories']);
  }
}
