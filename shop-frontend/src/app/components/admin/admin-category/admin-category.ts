import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category-service';
import { Category } from '../../../models/category';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AdminCategoryDialog, DialogData } from '../../dialogs/admin-category-dialog/admin-category-dialog';

@Component({
  selector: 'app-admin-category',
  imports: [CommonModule],
  templateUrl: './admin-category.html',
  styleUrl: './admin-category.scss'
})
export class AdminCategory implements OnInit{
  categories: Category[] = [];
  loading = true;
  showDeleteModal = false;
  categoryToDelete: Category | null = null;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this.categoryService.getAllCategory().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.loading = false;
      }
    });
  }

  addNewCategory() {
    this.openCategoryDialog(undefined, 'new');;
  }

  editCategory(category: Category) {
    this.openCategoryDialog(category, 'edit');
  }

  private openCategoryDialog(category: Category | undefined, mode: 'new' | 'edit') {
    const dialogData: DialogData = {
      category: category,
      mode: mode
    };

    const dialogRef = this.dialog.open(AdminCategoryDialog, {
      width: '450px',
      maxHeight: '90vh',
      disableClose: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'save') {
        if (result.mode === 'new') {
          this.handleAddCategory(result.data);
        } else {
          this.handleEditCategory(result.data);
        }
      }
    });
  }

  private handleAddCategory(categoryData: Category) {
    this.categoryService.createCategory(categoryData).subscribe({
      next: (newCategory) => {
        console.log('Kategorija je uspešno dodana:', newCategory);
        this.loadCategories();
      },
      error: (error) => {
        console.error('Greška pri dodavanju kategorije:', error);
      }
    });
  }

  private handleEditCategory(categoryData: Category) {
    this.categoryService.updateCategory(categoryData.categoryID, categoryData).subscribe({
      next: (updatedCategory) => {
        console.log('Kategorija je uspešno ažurirana:', updatedCategory);
        this.loadCategories();
      },
      error: (error) => {
        console.error('Greška pri ažuriranju kategorije:', error);
      }
    });
  }

  confirmDelete(category: Category) {
    this.categoryToDelete = category;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.categoryToDelete = null;
  }

  deleteCategory() {
    if (this.categoryToDelete) {
      this.categoryService.deleteCategory(this.categoryToDelete.categoryID).subscribe({
        next: () => {
          this.categories = this.categories.filter(
            cat => cat.categoryID !== this.categoryToDelete?.categoryID
          );
          this.showDeleteModal = false;
          this.categoryToDelete = null;
          
          console.log('Kategorija je uspešno obrisana');
          this.loadCategories();
        },
        error: (error) => {
          this.showDeleteModal = false;
          this.categoryToDelete = null;
          this.loadCategories();
        }
      });
    }
  }
}
