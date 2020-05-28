import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {

  message: String;
  orderId: Number;
  products: ProductResponseModel[] = [];
  cartTotal;
  address: String;
  constructor(private router: Router,
    private orderService: OrderService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      message: String,
      products: ProductResponseModel[],
      orderId: Number,
      total: Number
    };

    this.message = state.message;
    this.orderId = state.orderId;
    this.products = state.products;
    this.cartTotal = state.total;
    this.address = state.products[0].address;
    console.log(this.products)
  }

  ngOnInit() {

  }

}

export interface ProductResponseModel {
  id: Number;
  title: string;
  description: string;
  price: Number;
  image: string;
  quantityOrdered: Number;
  address: String;
}
