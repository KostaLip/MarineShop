import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../services/user-service';
import { AdminUserDialog } from '../../dialogs/admin-user-dialog/admin-user-dialog';
import { CommonModule } from '@angular/common';

export interface User {
  userID: number,
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  admin: boolean,
  passwordHash: string
}

@Component({
  selector: 'app-admin-user',
  imports: [CommonModule],
  templateUrl: './admin-user.html',
  styleUrl: './admin-user.scss'
})
export class AdminUser implements OnInit {
  users: User[] = [];
  loading = false;
  showDeleteModal = false;
  userToDelete: User | null = null;

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      }
    });
  }

  addNewUser(): void {
    const dialogRef = this.dialog.open(AdminUserDialog, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: true,
      data: {
        mode: 'new'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'save') {
        this.userService.createUser(result.data).subscribe({
          next: (createdUser) => {
            this.users.push(createdUser);
            console.log('User created:', createdUser);
            this.loadUsers();
          },
          error: (error) => {
            console.error('Error creating user:', error);
            this.loadUsers();
          }
        });
      }
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(AdminUserDialog, {
      width: '600px',
      maxWidth: '90vw',
      disableClose: true,
      data: {
        user: user,
        mode: 'edit'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.action === 'save') {
        const updateData: any = {
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          email: result.data.email,
          phone: result.data.phone,
          admin: result.data.admin
        };

        if (result.data.passwordHash && result.data.passwordHash.trim()) {
          updateData.passwordHash = result.data.passwordHash;
        }

        this.userService.updateUser(updateData, result.data.userId).subscribe({
          next: (updatedUser) => {
            const index = this.users.findIndex(u => u.userID === result.data.userID);
            if (index !== -1) {
              this.users[index] = updatedUser;
              console.log('User updated:', updatedUser);
              this.loadUsers();
            }
          },
          error: (error) => {
            this.loadUsers();
            console.error('Error updating user:', error);
          }
        });
        this.loadUsers();
      }
      this.loadUsers();
    });
    this.loadUsers();
  }

  confirmDelete(user: User): void {
    this.userToDelete = user;
    this.showDeleteModal = true;
  }

  deleteUser(): void {
    if (!this.userToDelete) {
      return;
    }

    this.userService.deleteUser(this.userToDelete.userID).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.userID !== this.userToDelete!.userID);
        this.cancelDelete();
        console.log('User deleted:', this.userToDelete);
      },
      error: (error) => {
        console.error('Error deleting user:', error);
        this.cancelDelete();
      }
    });
    this.loadUsers();
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.userToDelete = null;
    this.loadUsers();
  }
}