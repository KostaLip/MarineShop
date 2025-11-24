import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../../models/category';
import { CloudinaryService } from '../../../services/cloudinary-service';

export interface DialogData {
  category?: Category;
  mode: 'new' | 'edit';
}

@Component({
  selector: 'app-admin-category-dialog',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-category-dialog.html',
  styleUrl: './admin-category-dialog.scss'
})
export class AdminCategoryDialog implements OnInit {
  categoryForm: FormGroup;
  isEditMode: boolean = false;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  uploading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdminCategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cloudinaryService: CloudinaryService
  ) {
    this.categoryForm = this.fb.group({
      categoryName: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      iconName: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.isEditMode = this.data.mode === 'edit' && this.data.category !== undefined;
    
    if (this.isEditMode && this.data.category) {
      this.categoryForm.patchValue({
        categoryName: this.data.category.categoryName,
        description: this.data.category.description,
        iconName: this.data.category.iconName
      });
    }
  }

  get dialogTitle(): string {
    return this.isEditMode ? 'Uredi Kategoriju' : 'Dodaj Novu Kategoriju';
  }

  get submitButtonText(): string {
    return this.isEditMode ? 'Sačuvaj Izmene' : 'Dodaj Kategoriju';
  }

  async onSubmit() {
    this.uploading = true;
      
      try {
        let iconName = this.categoryForm.get('iconName')?.value;
        
        if (this.selectedFile) {
          const uploadResponse = await this.uploadToCloudinary();
          iconName = uploadResponse.secure_url;
        }

        const formValue = this.categoryForm.value;
        const categoryData: Category = {
          ...formValue,
          iconName: iconName,
          ...(this.isEditMode && this.data.category ? { categoryID: this.data.category.categoryID } : {})
        };
       
        this.dialogRef.close({
          action: 'save',
          data: categoryData,
          mode: this.data.mode
        });
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        alert('Greška pri upload-u slike. Pokušajte ponovo.');
      } finally {
        this.uploading = false;
      }
  }

  private uploadToCloudinary(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.selectedFile) {
        reject('No file selected');
        return;
      }

      this.cloudinaryService.uploadImage(this.selectedFile).subscribe({
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
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        alert('Molimo odaberite sliku (JPEG, PNG ili GIF)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('Slika je prevelika. Maksimalna veličina je 5MB');
        return;
      }

      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);

      this.categoryForm.patchValue({ iconName: 'file_selected' });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.categoryForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.categoryForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'Ovo polje je obavezno';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `Minimum ${requiredLength} karaktera`;
      }
    }
    return '';
  }
}
