import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { Observable } from 'rxjs';
import { DatabaseOrderModel } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  products: ProductResponseModel[] = [];
  ServerURL = environment.SERVER_URL;

  constructor(private http: HttpClient) {
  }


  getSingleOrder(orderId: Number) {
    return this.http.get<ProductResponseModel[]>(`${this.ServerURL}orders/${orderId}`).toPromise();
  }

  getUserOrders(userId: Number) : Observable<UserOrdersResponseModel> {
    return this.http.get<UserOrdersResponseModel>(this.ServerURL + 'orders/myOrders/' + userId);
  }

  getOrdersAdmin() : Observable<DatabaseOrderModel>{
    return this.http.get<DatabaseOrderModel>(this.ServerURL + 'orders/getAdmin/');
  }

  deleteOrderAdmin(id: Number):  Observable<any> {
    return this.http.delete<any>(this.ServerURL + 'orders/delete/' + id);
  }
}

interface ProductResponseModel {
  id: Number;
  title: String;
  description: String;
  price: Number;
  quantityOrdered: Number;
  image: String;
}

interface UserOrdersResponseModel {
  id: Number;
  user_id: String;
  date: Date;
  total: Number;
  address: String;
}