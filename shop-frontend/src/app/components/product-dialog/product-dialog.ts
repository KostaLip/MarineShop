import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { ReviewService } from '../../services/review-service';
import { Review } from '../../models/review';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth-service';
import { User } from '../../services/auth/auth-service';
import { ImageService } from '../../services/image-service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.html',
  styleUrls: ['./product-dialog.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, CurrencyPipe, FormsModule, ReactiveFormsModule],
})
export class ProductDialogComponent implements OnInit {
  reviews: Review[] = [];
  newReview = { rating: 0, comment: '' };
  currentUser: User | null = null;
  yourReview: Review | null = null;
  selectedImage: string = '';
  showImageModal: boolean = false;
  modalImage: string = '';
  productImages: any[] = [];

  constructor(
    private reviewService: ReviewService,
    private auth: AuthService,
    private imageService: ImageService,
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.loadReviews();
  }

submitReview() {
  console.log('Nova recenzija:', this.newReview);
  this.reviewService.createReview(
    this.data.productId,
    this.currentUser!.userID,
    this.newReview!.rating,
    this.newReview.comment
  ).subscribe({
    next: (response) => {
      console.log('Recenzija uspešno dodana:', response);
        this.newReview = { rating: 0, comment: '' };
        this.loadReviews();
    },
    error: (err) => {
        console.log('Greška pri dodavanju recenzije:', err);
    }
  })
}

  loadReviews() {
  this.auth.currentUser$.subscribe(user => {
    this.currentUser = user;

    if (this.currentUser) {
      console.log('usao sam u if');
      console.log(this.currentUser);
      this.reviewService.getAllReviewsByProductAndUser(this.data.productId, this.currentUser.userID).subscribe({
        next: (data) => {
          this.yourReview = data;
        },
        error: (err) => {
          this.yourReview = null;
        }
      });
    }
  });

  this.reviewService.getAllReviewsByProduct(this.data.productId).subscribe({
    next: (data) => {
      this.reviews = data;
    },
    error: (err) => {
      console.log('Greška pri učitavanju recenzija:', err);
      this.reviews = [];
    }
  });

  this.imageService.getImageByProduct(this.data.productId).subscribe({
    next: (data) => {
      this.productImages = data;
    },
    error: (err) => {
      console.log('Greška pri učitavanju slika:', err);
      this.reviews = [];
    }
  })
  }

  selectImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  openImageModal(imageUrl: string) {
    this.modalImage = imageUrl;
    this.showImageModal = true;
  }

  closeImageModal() {
    this.showImageModal = false;
  }

  close() {
    this.dialogRef.close();
  }
}
