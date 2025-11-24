import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { REVIEW_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private httpClient:HttpClient) {}

  public getAllReviewsByProduct(productId: number): Observable<any> {
    return this.httpClient.get(`${REVIEW_URL}/product/${productId}`, {withCredentials: true})
  }

  public getAllReviewsByProductAndUser(productId: number, userId: number): Observable<any> {
    return this.httpClient.get(`${REVIEW_URL}/product/${productId}/user/${userId}`, {withCredentials: true})
  }

  public createReview(productId: number, userId: number, rating: number, comment: string): Observable<any> {
  const reviewRequest = {
    productId: productId,
    userId: userId,
    rating: rating,
    reviewComment: comment
  };
  
  return this.httpClient.post(`${REVIEW_URL}`, reviewRequest, {withCredentials: true});
}
}
