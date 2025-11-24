import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancel',
  imports: [CommonModule],
  templateUrl: './cancel.html',
  styleUrl: './cancel.scss'
})
export class Cancel {
  constructor(private router: Router) {}

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
