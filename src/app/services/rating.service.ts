import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  getAverageProductRating(productId : Number) : Observable<any> {
    return this.http.get<any>(this.SERVER_URL + 'rating/' + productId);
  }

  getUserRating(userId : Number, productId:Number) :Observable <any> {
    return this.http.get<any>(this.SERVER_URL + 'rating/' + userId + "/" + productId);
  }

  addRatingToProduct(userId: Number, productId: Number, value: Number) : Observable <any> {
    return this.http.post(`${this.SERVER_URL}rating/new`, {
      userId: userId,
      productId: productId,
      value: value
    });
  }

  updateProductRating(userId: Number, productId: Number, value: Number) : Observable <any> {
    return this.http.put(`${this.SERVER_URL}rating/update`, {
      userId: userId,
      productId: productId,
      value: value
    });
  }

  getRatingStatistic() :Observable <any> {
    return this.http.get<any>(this.SERVER_URL + 'rating/statistic');
  }

}
