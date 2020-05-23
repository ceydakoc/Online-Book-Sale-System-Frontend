import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { ProductModelServer, ServerResponse } from 'src/app/model/product.model';
import { CartService } from 'src/app/services/cart.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderPipe } from 'ngx-order-pipe';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  p: number = 1;
  products: ProductModelServer[] = [];
  searchText: string;
  sortOptions: string[] = ["Name: A-Z", "Name: Z-A", "Price: Low to High", "Price: High to Low"];
  sortText : string[] = ["name" , "name" , "price", "price"]
  selectedOption: number = -1;
  isReverse: boolean = false;
  constructor(private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private orderPipe: OrderPipe) {

  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((prods: ServerResponse) => {
      this.products = prods.products;
    });

  }

  selectProduct(id: Number) {
    this.router.navigate(['/product', id]).then();
  }

  AddToCart(id: number) {
    this.cartService.AddProductToCart(id);
  }

  sortBy() {

    if (this.selectedOption == 1 || this.selectedOption == 3){
      this.isReverse = true;
    }
    else{
      this.isReverse = false;
    }

    this.products = this.orderPipe.transform(this.products, this.sortText[this.selectedOption], this.isReverse);
  }
}
