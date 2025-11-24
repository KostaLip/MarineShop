import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cart-service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-success',
  imports: [CommonModule],
  templateUrl: './success.html',
  styleUrl: './success.scss'
})
export class Success implements OnInit {
  sessionId: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.sessionId = this.route.snapshot.queryParams['session_id'] || '';
    
    const pendingOrder = localStorage.getItem('pendingOrder');
    if (pendingOrder) {
      const orderData = JSON.parse(pendingOrder);
      
      this.http.post('http://localhost:8080/api/v1/payments/confirm-order', {
        sessionId: this.sessionId,
        items: orderData.items
      }).subscribe();
    }

    this.cartService.clearCart();
    localStorage.removeItem('pendingOrder');
  }

  goToHome() {
    this.router.navigate(['/categories']);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }
}
