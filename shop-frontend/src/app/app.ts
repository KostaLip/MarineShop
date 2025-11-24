import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/main/header/header';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminHeader } from './components/admin/admin-header/admin-header';

//import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MatDialogModule, CommonModule, AdminHeader],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('shop-frontend');
  constructor(private router: Router) {}

  shouldShowHeader(): boolean {
    const currentRoute = this.router.url;
    const hiddenRoutes = ['/login', '/signup', '/admin'];
    
    return !hiddenRoutes.some(route => currentRoute.startsWith(route));
  }

  shouldShowAdminHeader(): boolean {
    const currentRoute = this.router.url;
    return currentRoute.startsWith('/admin') && currentRoute !== '/admin/login';
  }
}
