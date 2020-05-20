import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductModelServer } from 'src/app/model/product.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderId: any
  total: any
  products: ProductModelServer[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state as {
      orderId: Number,
      total: Number
    };
    this.orderId = state.orderId
    this.total = state.total
  }

  ngOnInit(): void {

    this.orderService.getSingleOrder(this.orderId).then(prods => {
      //@ts-ignore
      this.products = prods;
      console.log(this.products)
    });

  }


}

