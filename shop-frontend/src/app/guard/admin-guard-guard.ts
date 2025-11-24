import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn() && this.auth.isAdmin()) {
      return true;
    }

    alert('Nemate pristup ovoj stranici!');
    this.router.navigate(['/']);
    return false;
  }
}