import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from 'rxjs';
import { ProductModelServer, ServerResponse } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient,
  ) { }

  getAllFavorites(userId : number) : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.SERVER_URL + 'favorites/' + userId)
  }
  getSingleFavorite(userId : Number,productId:Number) :Observable <any> {
    return this.http.get<any>(this.SERVER_URL + 'favorites/' + userId + "/" + productId)
  }
  removeFromFavorites(userId : Number,productId:Number):Observable <any>{
    return this.http.delete<any>(this.SERVER_URL + 'favorites/' + userId + "/" + productId)
  }

}
