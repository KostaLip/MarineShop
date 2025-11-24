import { Component, OnInit } from '@angular/core';
import { AuthService, User as AuthModel } from '../../../services/auth/auth-service';
import { User as UserModel } from '../../../models/user';
import { UserService } from '../../../services/user-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateUserRequest } from '../../../services/user-service';

export interface User {
  userId: number,
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  isAdmin: boolean
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  currentUser: AuthModel | null = null;
  user: User | null = null;
  isEditting: boolean = false;
  newPassword: string = '';

  constructor(
    private auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadUserData();
      }
    });
  }

  private loadUserData(): void {
    if (!this.currentUser?.userID) return;
    
    this.userService.getUserById(this.currentUser.userID).subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        console.log('Greška pri učitavanju korisnika:', err);
      }
    });
  }

  saveProfile(): void {
    if (!this.user) return;
    if (!this.user.firstName?.trim() || !this.user.lastName?.trim() || !this.user.email?.trim()) {
      alert('Molimo popunite sva obavezna polja');
      return;
    }

    const updateData: UpdateUserRequest = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone
    };

    if (this.newPassword && this.newPassword.trim()) {
      if (this.newPassword.length < 6) {
        alert('Šifra mora imati najmanje 6 karaktera');
        return;
      }
      updateData.passwordHash = this.newPassword.trim();
    }

    console.log('Šaljem podatke:', updateData); 
    console.log(this.user)
    this.userService.updateUser(updateData, this.user.userId).subscribe({
      next: (data) => {
        console.log('Korisnik uspešno ažuriran');
        this.isEditting = false;
        this.newPassword = '';
        
        if (data) {
          this.user = data;
        }
        
        alert('Profil je uspešno ažuriran');
        this.auth.setCurrentUser(data);
      },
      error: (err) => {
        console.error('Greška pri ažuriranju korisnika:', err);
        alert('Greška pri ažuriranju profila');
      }
    });
  }

  setEditMode(): void {
    if (this.isEditting) {
      this.newPassword = '';
      this.loadUserData();
    }
    this.isEditting = !this.isEditting;
  }
}