import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface SignupRequest {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface User {
  userID: number;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(credentials: LoginRequest): Observable<any> {
    console.log(credentials);
  return this.http.post<any>('http://localhost:8080/api/v1/login', credentials, {withCredentials: true}).pipe(
    tap(user => {
      const safeUser = {
        userID: user.userID,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.admin
      };
      console.log(user);
      console.log(safeUser);
      localStorage.setItem('currentUser', JSON.stringify(safeUser));
      this.currentUserSubject.next(safeUser);
    })
  );
}


  signup(user: SignupRequest): Observable<any> {
  return this.http.post<any>('http://localhost:8080/api/v1/signup', user).pipe(
    tap(u => {
      const safeUser = {
        userID: u.userID,
        firstName: u.firstName,
        lastName: u.lastName,
        isAdmin: u.admin
      };
      localStorage.setItem('currentUser', JSON.stringify(safeUser));
      this.currentUserSubject.next(safeUser);
    })
  );
}

setCurrentUser(user: User) {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return !!user?.isAdmin;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}
