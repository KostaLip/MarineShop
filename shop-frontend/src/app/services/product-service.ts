import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PRODUCT_URL } from '../constants';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient:HttpClient) {}

  public getAllProducts(): Observable<any> {
      return this.httpClient.get(`${PRODUCT_URL}`, {withCredentials: true})
    }

  public getProductsByCategory(categoryId: number): Observable<any> {
      return this.httpClient.get(`${PRODUCT_URL}/category/${categoryId}`, {withCredentials: true})
  }

  public createProduct(product: Product): Observable<any> {
    return this.httpClient.post(`${PRODUCT_URL}/admin`, product, {withCredentials: true});
  }

  public updateProduct(product: Product, productID: number): Observable<any> {
    return this.httpClient.put(`${PRODUCT_URL}/admin/id/${productID}`, product, {withCredentials: true});
  }

  public deleteProduct(productID: number): Observable<any> {
    return this.httpClient.delete(`${PRODUCT_URL}/admin/id/${productID}`, {withCredentials: true});
  }
}
