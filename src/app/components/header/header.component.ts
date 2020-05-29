import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/model/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { ServerResponse } from 'src/app/model/product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: Number;
  authState: boolean;
  favoriteCount: Number;

  constructor(public cartService: CartService,
    public userService: UserService,
    private favoriteService: FavoriteService) {
  }

  ngOnInit(): void {

    this.cartService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
    });

    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);

    this.userService.authState$.subscribe(authState => this.authState = authState);
  }

}
