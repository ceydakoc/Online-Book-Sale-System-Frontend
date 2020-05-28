import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(private orderService: OrderService,
    private userService: UserService,
    private router : Router) { }

  ngOnInit(): void {
    //@ts-ignore
    this.orderService.getUserOrders(this.userService.userData$.getValue().userId).subscribe((orders: ServerResponse) => {
      this.orders = orders;
      for (var index = 0; index < orders.length; index++) {
        this.orders[index].date = this.orders[index].date.replace('T',' ')
        this.orders[index].date = this.orders[index].date.substring(0,16)
      }
    });
  }

  orderDetails(orderId,total,address){
    const navigationExtras: NavigationExtras = {
      state: {
        orderId: orderId,
        total : total,
        address: address
      }
    };
    this.router.navigate(['/orderDetails'], navigationExtras)
  }

}
