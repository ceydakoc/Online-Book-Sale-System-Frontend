import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/model/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: Number;
  subTotal: Number;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartDataObs$.subscribe((data: CartModelServer) => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  ChangeQuantity(id: number, increaseQuantity: Boolean) {
    this.cartService.UpdateCartItems(id, increaseQuantity);
  }
}
