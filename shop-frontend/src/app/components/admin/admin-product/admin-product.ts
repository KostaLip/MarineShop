import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product-service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AdminProductDialog, DialogData } from '../../dialogs/admin-product-dialog/admin-product-dialog';
import { ImageService } from '../../../services/image-service';

export interface Image {
  productId?: number,
  imageUrl?: string
}

@Component({
  selector: 'app-admin-product',
  imports: [CommonModule],
  templateUrl: './admin-product.html',
  styleUrl: './admin-product.scss'
})
export class AdminProduct implements OnInit{
  products: Product[] = [];
  loading = true;
  showDeleteModal = false;
  productToDelete: Product | null = null;
  
  constructor(private productService: ProductService,
    private router: Router,
    private dialog: MatDialog,
    private imageService: ImageService) {}
    
  ngOnInit() {
    this.loadProducts();
  }
  
  loadProducts() {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.products.forEach(product => {
        this.imageService.getImageByProduct(product.productID!).subscribe({
          next: (images) => {
            if (images && images.length > 0) {
              product.displayImage = images[0].imageUrl; 
            }
          }
        });
      });
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.loading = false;
      }
    });
  }
  
  addNewProduct() {
    this.openProductDialog(undefined, 'new');
  }
  
  editProduct(product: Product) {
    this.openProductDialog(product, 'edit');
  }
  
  private openProductDialog(product: Product | undefined, mode: 'new' | 'edit') {
    const dialogData: DialogData = {
      product: product,
      mode: mode
    };
    const dialogRef = this.dialog.open(AdminProductDialog, {
      width: '450px',
      maxHeight: '90vh',
      disableClose: true,
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'save') {
        if (result.mode === 'new') {
          this.handleAddProduct(result.data);
        } else {
          this.handleEditProduct(result.data);
        }
      }
    });
  }
  
  private handleAddProduct(productData: any) {
    this.productService.createProduct(productData).subscribe({
      next: (newProduct) => {
        console.log('Proizvod je uspešno dodan:', newProduct);
        
        if (productData.additionalImages && productData.additionalImages.length > 0) {
          this.saveProductImages(newProduct.productID, productData.additionalImages);
        }
        
        this.loadProducts();
      },
      error: (error) => {
        console.error('Greška pri dodavanju proizvoda:', error);
      }
    });
  }

  private saveProductImages(productId: number, imageUrls: string[]) {
    imageUrls.forEach(url => {
      const image: Image = {
        productId: productId,
        imageUrl: url
      }
      this.imageService.saveProductImage(image).subscribe();
      console.log('Saving image for product', productId, ':', url);
    });
  }
  
  private handleEditProduct(productData: any) {
    this.productService.updateProduct(productData, productData.productID!).subscribe({
      next: (updatedProduct) => {
        console.log('Proizvod je uspešno ažuriran:', updatedProduct);
        this.loadProducts();
      },
      error: (error) => {
        console.error('Greška pri ažuriranju proizvoda:', error);
      }
    });
  }
  
  confirmDelete(product: Product) {
    this.productToDelete = product;
    this.showDeleteModal = true;
  }
  
  cancelDelete() {
    this.showDeleteModal = false;
    this.productToDelete = null;
  }
  
  deleteProduct() {
    if (this.productToDelete) {
      this.productService.deleteProduct(this.productToDelete.productID!).subscribe({
        next: () => {
          this.products = this.products.filter(
            prod => prod.productID !== this.productToDelete?.productID
          );
          this.showDeleteModal = false;
          this.productToDelete = null;
         
          console.log('Proizvod je uspešno obrisan');
          this.loadProducts();
        },
        error: (error) => {
          this.showDeleteModal = false;
          this.productToDelete = null;
          this.loadProducts();
        }
      });
    }
  }
}