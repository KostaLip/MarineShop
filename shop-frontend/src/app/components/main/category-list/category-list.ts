import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CategoryService } from '../../../services/category-service';
import { Category } from '../../../models/category';
import { ProductList } from '../product-list/product-list';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from '../../category-dialog/category-dialog';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule, MatCardModule, ProductList],
  templateUrl: './category-list.html',
  styleUrls: ['./category-list.scss'],
  standalone: true
})
export class CategoryList implements OnInit, OnDestroy {
  categories: Category[] = [];
  selectedCategory?: Category;
  selectedCategoryID?: number;
  private destroy$ = new Subject<void>();

  constructor(private categoryService: CategoryService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.categoryService.getAllCategory()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.categories = data;
          if (data.length > 0) {
            this.selectedCategory = data[0];
            this.selectedCategoryID = (data[0] as any).categoryID;
          }
        },
        error: (err) => console.log('Greška pri učitavanju kategorija:', err)
      });
  }

  selectCategory(category: Category) {
    console.log('Izabrana kategorija:', category.categoryName);
    this.selectedCategory = category;
    
    this.selectedCategoryID = (category as any).categoryID;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openCategoryDialog(category: any) {
    this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: category
    });
  }
}