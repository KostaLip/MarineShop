import { Component, Inject, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../../models/category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CloudinaryService } from '../../../services/cloudinary-service';
import { CategoryService } from '../../../services/category-service';

export interface DialogData {
  product?: Product;
  mode: 'new' | 'edit';
}

@Component({
  selector: 'app-admin-product-dialog',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-product-dialog.html',
  styleUrl: './admin-product-dialog.scss'
})
export class AdminProductDialog implements OnInit {
  productForm: FormGroup;
  isEditMode: boolean = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  uploading: boolean = false;
  categories: Category[] = [];
  selectedFiles: File[] = [];
  previewUrls: string[] = [];
  maxImages: number = 5;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdminProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cloudinaryService: CloudinaryService,
    private categoryService: CategoryService)
    {
      this.productForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      categoryID: ['', Validators.required],
      displayImage: [''],
      additionalImages: [[]]
    });
    }

    ngOnInit() {
    this.loadCategories();
    this.isEditMode = this.data.mode === 'edit' && this.data.product !== undefined;

    if (!this.isEditMode) {
    this.productForm.get('displayImage')?.setValidators([Validators.required]);
  }
    
    if (this.isEditMode && this.data.product) {
      this.productForm.patchValue({
        productName: this.data.product.productName,
        description: this.data.product.description,
        price: this.data.product.price,
        stockQuantity: this.data.product.stockQuantity,
        categoryID: this.data.product.category.categoryID,
        displayImage: this.data.product.displayImage
      });
    }
  }

  loadCategories() {
    this.categoryService.getAllCategory().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  get dialogTitle(): string {
    return this.isEditMode ? 'Uredi Proizvod' : 'Dodaj Novi Proizvod';
  }

  get submitButtonText(): string {
    return this.isEditMode ? 'Sačuvaj Izmene' : 'Dodaj Proizvod';
  }

  async onSubmit() {
    if (this.isEditMode) {
      await this.handleEditSubmit();
    } else {
      await this.handleNewSubmit();
    }
  }

  private async handleEditSubmit() {
    this.uploading = true;
    
    try {
      let displayImage = this.productForm.get('displayImage')?.value;
      
      if (this.selectedFile) {
        const uploadResponse = await this.uploadToCloudinary(this.selectedFile);
        displayImage = uploadResponse.secure_url;
      }

      const formValue = this.productForm.value;
      const productData = {
        productName: formValue.productName,
        description: formValue.description,
        price: parseFloat(formValue.price),
        stockQuantity: parseInt(formValue.stockQuantity),
        categoryId: parseInt(formValue.categoryID),
        displayImage: displayImage,
        rating: this.data.product?.rating || 0,
        dateCreated: this.data.product?.dateCreated || new Date(),
        productID: this.data.product?.productID
      };

      this.dialogRef.close({
        action: 'save',
        data: productData,
        mode: 'edit'
      });
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Greška pri upload-u slike. Pokušajte ponovo.');
    } finally {
      this.uploading = false;
    }
  }

  private async handleNewSubmit() {
    this.uploading = true;
    
    try {
      let displayImage = this.productForm.get('displayImage')?.value;
      let additionalImageUrls: string[] = [];

      if (this.selectedFile) {
        const uploadResponse = await this.uploadToCloudinary(this.selectedFile);
        displayImage = uploadResponse.secure_url;
      }

      for (let file of this.selectedFiles) {
        const uploadResponse = await this.uploadToCloudinary(file);
        additionalImageUrls.push(uploadResponse.secure_url);
      }

      const formValue = this.productForm.value;
      const productData = {
        productName: formValue.productName,
        description: formValue.description,
        price: parseFloat(formValue.price),
        stockQuantity: parseInt(formValue.stockQuantity),
        categoryId: parseInt(formValue.categoryID),
        displayImage: displayImage,
        additionalImages: additionalImageUrls,
        rating: 0,
        dateCreated: new Date()
      };

      this.dialogRef.close({
        action: 'save',
        data: productData,
        mode: 'new'
      });
    } catch (error) {
      console.error('Error uploading:', error);
      alert('Greška pri upload-u slika. Pokušajte ponovo.');
    } finally {
      this.uploading = false;
    }
  }

  private uploadToCloudinary(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cloudinaryService.uploadImage(file).subscribe({
        next: (response) => {
          console.log('Cloudinary upload success:', response);
          resolve(response);
        },
        error: (error) => {
          console.error('Cloudinary upload error:', error);
          reject(error);
        }
      });
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!this.isValidImageFile(file)) {
        return;
      }

      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);

      this.productForm.patchValue({ displayImage: 'file_selected' });
    }
  }

  onMultipleFilesSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    
    if (this.selectedFiles.length + files.length > this.maxImages) {
      alert(`Možete dodati maksimalno ${this.maxImages} slika`);
      return;
    }

    files.forEach(file => {
      if (this.isValidImageFile(file)) {
        this.selectedFiles.push(file);
        
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewUrls.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
  }

  private isValidImageFile(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      alert('Molimo odaberite sliku (JPEG, PNG ili GIF)');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('Slika je prevelika. Maksimalna veličina je 5MB');
      return false;
    }
    return true;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.productForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'Ovo polje je obavezno';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `Minimum ${requiredLength} karaktera`;
      }
      if (field.errors['min']) {
        return `Vrijednost mora biti veća od ${field.errors['min'].min}`;
      }
    }
    return '';
  }
}