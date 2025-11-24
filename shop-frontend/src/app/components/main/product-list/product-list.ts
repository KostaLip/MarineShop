import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product-service';
import { Product } from '../../../models/product';
import { ProductDialogComponent } from '../../product-dialog/product-dialog';
import { MatDialog } from '@angular/material/dialog';
import { ImageService } from '../../../services/image-service';
import { ReviewService } from '../../../services/review-service';
import { Review } from '../../../models/review';
import { CartService } from '../../../services/cart-service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
  standalone: true
})
export class ProductList implements OnChanges {
  products: Product[] = [];
  sum: number = 0;
  searchTerm: string = '';
  ratingFilter: string = '';
  filteredProducts: Product[] = [];
  showToast = false;
  toastMessage = '';

  @Input() categoryID!: number;
  
  constructor(private productService: ProductService,
              private dialog: MatDialog,
              private imageService: ImageService,
              private reviewService: ReviewService,
              private cartService: CartService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoryID'] && changes['categoryID'].currentValue != null) {
      this.loadProducts();
    }
  }

  private loadProducts() {
    if (this.categoryID == null) {
      this.products = [];
      this.filteredProducts = [];
      return;
    }

    this.productService.getProductsByCategory(this.categoryID).subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = [...data];
        
        this.products.forEach(product => {
          this.imageService.getImageByProduct(product.productID!).subscribe({
            next: (data) => {
              product.displayImage = data[0].imageUrl;
              console.log(product.displayImage);
            },
            error: (err) => {
              console.log('Greška pri učitavanju slike:', err);
              product.displayImage = '';
            }
          });
          
          this.reviewService.getAllReviewsByProduct(product.productID!).subscribe({
            next: (data: Review[]) => {
              data.forEach(review => {
                this.sum = this.sum + review.rating;
              });
              product.rating = this.sum / data.length;
              this.sum = 0;
              if(Number.isNaN(product.rating)) {
                product.rating = 0;
              }
              this.applyFilters();
            },
            error: (err) => {
              console.log('Greška pri učitavanju ocjene:', err);
              product.rating = 0;
            }
          });
          console.log(product);
        });
      },
      error: (err) => {
        console.log('Greška pri učitavanju proizvoda:', err);
        this.products = [];
        this.filteredProducts = [];
      }
    });
  }

  trackByProductId(index: number, product: Product): any {
    return (product as any).productID || (product as any).id || index;
  }

  openProductDialog(product: any) {
    console.log(product);
    this.dialog.open(ProductDialogComponent, {
      height: '1200px',
      width: '1400px',
      data: { 
        productName: product.productName,
        price: product.price,
        description: product.description,
        productId: product.productID
      }
    });
  }

  onSearchChange() {
    this.applyFilters();
  }

  onFilterChange() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesSearch = product.productName.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesRating = !this.ratingFilter || product.rating >= parseFloat(this.ratingFilter);
      
      return matchesSearch && matchesRating;
    });
  }

  clearFilters() {
    this.searchTerm = '';
    this.ratingFilter = '';
    this.filteredProducts = [...this.products];
  }

  addToCart(product: any) {
  if (product.stockQuantity > 0) {
    this.cartService.addToCart(product);
    
    this.toastMessage = `${product.productName} dodato!`;
    this.showToast = true;
    
    setTimeout(() => {
      this.showToast = false;
    }, 2000);
  }
}
}