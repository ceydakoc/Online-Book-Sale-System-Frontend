import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(private orderService: OrderService,
              private userService: UserService) { }

  ngOnInit(): void {
    //@ts-ignore
    this.orderService.getUserOrders(this.userService.userData$.getValue().userId).subscribe((orders: ServerResponse) => {
      this.orders = orders;
      console.log(this.orders);
    });
  }

}
