import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.errorMsg = ''

    if (!this.email.trim()) {
      this.errorMsg = 'Email is required';
      return;
    }

    if (!this.password.trim()) {
      this.errorMsg = 'Password is required.';
      return;
    }

    this.auth.login({email: this.email, password: this.password}).subscribe({
      next: (response) => {
        if (this.auth.isAdmin()) {
          this.router.navigate(['/admin/categories']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: err => this.errorMsg = 'Pogrešan email ili lozinka'
    });
  }

  navigateToSignup(event: Event) {
    event.preventDefault();
    this.router.navigate(['/signup']);
  }
}
