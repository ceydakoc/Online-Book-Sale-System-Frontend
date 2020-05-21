import { Component, OnInit } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProductModelServer, ServerResponse } from 'src/app/model/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  p: number = 1;
  products: ProductModelServer[] = [];
  searchText : string

  constructor(private favoriteService: FavoriteService,
    private router: Router,
    private cartService : CartService,
    private userService: UserService) { }

  ngOnInit(): void {
    var data = this.userService.userData$.getValue();
    if(data != null){
      //@ts-ignore
      var userId = data.userId;
      this.favoriteService.getAllFavorites(userId).subscribe((prods: ServerResponse) => {
        this.products = prods.products;
      });
    }
    else{
      console.log("login error.")
    }
  }

  selectProduct(id: Number) {
    this.router.navigate(['/product', id]).then();
  }

  AddToCart(id:number){
    this.cartService.AddProductToCart(id);
  }
  
}
