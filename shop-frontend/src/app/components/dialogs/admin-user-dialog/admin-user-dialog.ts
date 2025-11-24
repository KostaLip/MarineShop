import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../../admin/admin-user/admin-user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../services/user-service';
import { CommonModule } from '@angular/common';

export interface DialogData {
  user?: User;
  mode: 'new' | 'edit';
}

@Component({
  selector: 'app-admin-user-dialog',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-user-dialog.html',
  styleUrl: './admin-user-dialog.scss'
})
export class AdminUserDialog implements OnInit{
  userForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdminUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[\+]?[0-9\s\-\(\)]{8,15}$/)]],
      passwordHash: [''],
      admin: [false]
    });
  }

  ngOnInit() {
    this.isEditMode = this.data.mode === 'edit' && this.data.user !== undefined;
    
    if (this.isEditMode && this.data.user) {
      this.userForm.patchValue({
        firstName: this.data.user.firstName,
        lastName: this.data.user.lastName,
        email: this.data.user.email,
        phone: this.data.user.phone,
        passwordHash: '',
        admin: this.data.user.admin
      });
      
      this.userForm.get('password')?.setValidators([Validators.minLength(6)]);
    } else {
      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    }
    
    this.userForm.get('password')?.updateValueAndValidity();
  }

  get dialogTitle(): string {
    return this.isEditMode ? 'Uredi Korisnika' : 'Dodaj Novog Korisnika';
  }

  get submitButtonText(): string {
    return this.isEditMode ? 'Sačuvaj Izmene' : 'Dodaj Korisnika';
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      
      if (this.isEditMode) {
        const userData: any = {
          userId: this.data.user!.userID,
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          email: formValue.email,
          phone: formValue.phone,
          admin: formValue.admin
        };
        if (formValue.passwordHash && formValue.passwordHash.trim()) {
          userData.passwordHash = formValue.passwordHash;
        }

        this.dialogRef.close({
          action: 'save',
          data: userData,
          mode: this.data.mode
        });
      } else {
        const userData: any = {
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          email: formValue.email,
          phone: formValue.phone,
          passwordHash: formValue.passwordHash,
          admin: formValue.admin
        };
        console.log(userData);
        this.dialogRef.close({
          action: 'save',
          data: userData,
          mode: this.data.mode
        });
      }
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return this.getRequiredMessage(fieldName);
      }
      if (field.errors['email']) {
        return 'Unesite validnu email adresu';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return this.getMinLengthMessage(fieldName, requiredLength);
      }
      if (field.errors['pattern']) {
        if (fieldName === 'phone') {
          return 'Unesite validan broj telefona';
        }
      }
    }
    return '';
  }

  private getRequiredMessage(fieldName: string): string {
    const messages: { [key: string]: string } = {
      firstName: 'Ime je obavezno',
      lastName: 'Prezime je obavezno',
      email: 'Email je obavezan',
      passwordHash: 'Šifra je obavezna'
    };
    return messages[fieldName] || 'Ovo polje je obavezno';
  }

  private getMinLengthMessage(fieldName: string, requiredLength: number): string {
    if (fieldName === 'firstName' || fieldName === 'lastName') {
      return `Minimum ${requiredLength} karaktera`;
    }
    if (fieldName === 'passwordHash') {
      return `Šifra mora imati najmanje ${requiredLength} karaktera`;
    }
    return `Minimum ${requiredLength} karaktera`;
  }
}
