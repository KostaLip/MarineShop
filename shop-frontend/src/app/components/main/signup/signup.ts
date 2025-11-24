import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SignupComponent {
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  password = '';
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    this.errorMsg = '';

    if (!this.firstName.trim()) {
      this.errorMsg = 'First name is required';
      return;
    }

    if (!this.lastName.trim()) {
      this.errorMsg = 'Last name is required';
      return;
    }

    if (!this.email.trim()) {
      this.errorMsg = 'Email is required';
      return;
    }

    if (!this.password.trim()) {
      this.errorMsg = 'Password is required.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMsg = 'Password too weak! Minimum 6 characters.';
      return;
    }

    this.auth.signup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      passwordHash: this.password
    }).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => this.errorMsg = 'Nešto je pošlo po zlu'
    });
  }

  navigateToLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/login']);
  }
}
