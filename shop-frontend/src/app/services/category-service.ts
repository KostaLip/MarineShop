import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CATEGORY_URL } from '../constants';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) {}

  public getAllCategory(): Observable<any> {
    return this.httpClient.get(`${CATEGORY_URL}`, {withCredentials: true})
  }

  deleteCategory(id: number): Observable<any> {
    return this.httpClient.delete(`${CATEGORY_URL}/admin/id/${id}`, {withCredentials: true});
  }

  updateCategory(id: number, category: Category): Observable<any> {
    return this.httpClient.put<Category>(`${CATEGORY_URL}/admin/id/${id}`, category, {withCredentials: true});
  }

  createCategory(category: Category): Observable<any> {
    return this.httpClient.post(`${CATEGORY_URL}/admin`, category, {withCredentials: true});
  }

}