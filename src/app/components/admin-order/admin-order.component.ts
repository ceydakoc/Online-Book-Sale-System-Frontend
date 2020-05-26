import { Component, OnInit } from '@angular/core';
import { DatabaseOrderModel } from 'src/app/model/order.model';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent implements OnInit {

  willDeleteId: Number;
  willShowId: Number;
  orders: DatabaseOrderModel[] = [];
  products: ProductModelServerAdmin[] = [];
  p: number = 1;
  searchText: string;
  keysToInclude: any[] = ["id", "user_id", "username", "total", "date"];
  selectedOption: string = "all"
  cartTotal: Number;

  constructor(private orderService: OrderService,
    private toast: ToastrService) {

  }
  ngOnInit(): void {
    this.getOrders();
  }

  deleteOrder() {
    this.orderService.deleteOrderAdmin(this.willDeleteId).subscribe(returnVal => {
      if (returnVal.success) {
        this.toast.success(`Successfully deleted from orders.`, "", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
        this.getOrders();
      }
      else {
        this.toast.error(`Something went wrong :( Could not deleted from orders`, "", {
          timeOut: 1500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    })
  }


  showOrder() {

  }

  getDeleteOrderId(orderId: Number) {
    this.willDeleteId = orderId;
  }

  getShowOrderId(orderId: Number) {
    this.willShowId = orderId;
    for (let index = 0; index < this.orders.length; index++) {
      if (this.orders[index].id == this.willShowId) {
        this.cartTotal = this.orders[index].total;
      }
    }

    this.orderService.getSingleOrder(this.willShowId).then(prods => {
      //@ts-ignore
      this.products = prods;
      console.log(this.products)
    });
  }

  getOrders() {
    this.orders.length = 0;
    console.log(this.orders)
    this.orderService.getOrdersAdmin().subscribe((returnVal: DatabaseOrderModel) => {
      //@ts-ignore
      if (returnVal.success) {
        //@ts-ignore
        this.orders = returnVal.orders;
        for (let index = 0; index < this.orders.length; index++) {
          this.orders[index].date = this.orders[index].date.replace('T', ' ');
          this.orders[index].date = this.orders[index].date.substring(0, 16);
        }
      }
    });
  }

  filterBy() {

    this.keysToInclude.length = 0;
    if (this.selectedOption !== "all") {
      this.keysToInclude.push(this.selectedOption)
    }
    else {
      this.keysToInclude.push("id", "user_id", "username", "total", "date");
    }
  }
}

export interface ProductModelServerAdmin {
  id: Number;
  product_id: Number;
  title: string;
  image: string;
  price: Number;
  quantity: Number;
}