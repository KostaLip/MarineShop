import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMAGE_URL } from '../constants';
import { Image } from '../components/admin/admin-product/admin-product';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private httpClient :HttpClient) {}

  public getImageByProduct(productId: number): Observable<any> {
    return this.httpClient.get(`${IMAGE_URL}/product/${productId}`, {withCredentials: true})
  }

  public saveProductImage(image: Image): Observable<any> {
    return this.httpClient.post(`${IMAGE_URL}`, image, {withCredentials: true});
  }

}
