import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AdminOrderDialog, DialogData } from '../../dialogs/admin-order-dialog/admin-order-dialog';

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

@Component({
  selector: 'app-admin-order',
  imports: [CommonModule],
  templateUrl: './admin-order.html',
  styleUrl: './admin-order.scss'
})
export class AdminOrder implements OnInit {
  orders: Order[] = [];
  loading = true;
  showDeleteModal = false;
  orderToDelete: Order | null = null;

  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.http.get<Order[]>('http://localhost:8080/api/v1/order/admin', {withCredentials: true}).subscribe({
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

  editOrder(order: Order) {
    this.openOrderDialog(order, 'edit');
  }

  private openOrderDialog(order: Order | undefined, mode: 'edit') {
    const dialogData: DialogData = {
      order: order,
      mode: mode
    };

    const dialogRef = this.dialog.open(AdminOrderDialog, {
      width: '500px',
      maxHeight: '90vh',
      disableClose: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'save') {
        this.handleEditOrder(result.data);
      }
    });
  }

  private handleEditOrder(orderData: Order) {
    this.http.put(`http://localhost:8080/api/v1/order/admin/id/${orderData.orderID}`, orderData, {withCredentials: true}).subscribe({
      next: (updatedOrder) => {
        console.log('Order updated successfully:', updatedOrder);
        this.loadOrders();
      },
      error: (error) => {
        console.error('Error updating order:', error);
      }
    });
  }

  confirmDelete(order: Order) {
    this.orderToDelete = order;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.orderToDelete = null;
  }

  deleteOrder() {
    if (this.orderToDelete) {
      this.http.delete(`http://localhost:8080/api/v1/order/admin/id/${this.orderToDelete.orderID}`, {withCredentials: true}).subscribe({
        next: () => {
          this.orders = this.orders.filter(
            order => order.orderID !== this.orderToDelete?.orderID
          );
          this.showDeleteModal = false;
          this.orderToDelete = null;
          console.log('Order deleted successfully');
          this.loadOrders();
        },
        error: (error) => {
          console.error('Error deleting order:', error);
          this.showDeleteModal = false;
          this.orderToDelete = null;
          this.loadOrders();
        }
      });
    }
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
}
