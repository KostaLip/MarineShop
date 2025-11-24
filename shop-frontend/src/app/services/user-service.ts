import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USER_URL } from '../constants';
import { User } from '../components/admin/admin-user/admin-user';

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passwordHash?: string;
  isAdmin?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient:HttpClient) {}

  public getUserById(userId: number): Observable<any> {
    return this.httpClient.get(`${USER_URL}/${userId}`, {withCredentials: true});
  }

  public updateUser(userData: UpdateUserRequest, userID: number): Observable<any> {
    return this.httpClient.put(`${USER_URL}/id/${userID}`, userData, {
      withCredentials: true
    });
  } 

  public getAllUsers(): Observable<any> {
    return this.httpClient.get(`${USER_URL}/admin`, {withCredentials: true});
  }

  public createUser(user: User): Observable<any> {
    return this.httpClient.post(`${USER_URL}`, user, {withCredentials: true});
  }

  public deleteUser(userID: number): Observable<any> {
    return this.httpClient.delete(`${USER_URL}/admin/id/${userID}`, {withCredentials: true});
  }
}
