import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.html',
  styleUrls: ['./category-dialog.scss'],
  imports: []
})
export class CategoryDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
