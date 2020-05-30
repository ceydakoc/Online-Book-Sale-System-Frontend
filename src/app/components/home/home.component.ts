import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderPipe } from 'ngx-order-pipe';
import { RatingService } from 'src/app/services/rating.service';
import { CategoryService } from 'src/app/services/category.service';
import { ExchangeService } from 'src/app/services/exchange.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  p: number = 1;
  products: any[] = [];
  searchText: string;
  sortOptions: string[] = ["Name: A-Z", "Name: Z-A", "Price: Low to High", "Price: High to Low"];
  sortText : string[] = ["name" , "name" , "price", "price"]
  selectedOption: number = -1;
  isReverse: boolean = false;
  categories: any[] = [];
  topSelling: any[] = [];
  tryAmount: number = 1;
  exchangeRates: any[] = [];
  euro: string;
  usd: string;
  gbp: string;
  jpy: string;
  mxn: string;

  constructor(private productService: ProductService,
    private router: Router,
    private cartService: CartService,
    private orderPipe: OrderPipe,
    private categoryService: CategoryService,
    private route : ActivatedRoute,
    private exchangeService : ExchangeService) {

      this.productService.getAllProducts().subscribe((prods: any) => {
        this.products = prods.products;
      });
  
      this.categoryService.getAllCategories().subscribe(returnVal => {
        this.categories = returnVal.categories;
      });

      this.getTopSelling();
      this.getCurrencies();
  }

  ngOnInit(): void {
  }

  selectProduct(id: Number) {
    this.router.navigate(['/product', id]).then();
  }

  AddToCart(id: number) {
    this.cartService.AddProductToCart(id);
  }

  editSearchText(catTitle: string){
    if(catTitle != "all-cat"){
      this.searchText = catTitle;
    }
    else {
      this.searchText = "";
    }
  }

  getTopSelling(){
    this.productService.getTopSelling().subscribe(returnVal => {
      var tempLength;
      if(returnVal.length >= 5){
        tempLength = 5;
      }
      else {
        tempLength = returnVal.length;
      }
      for (var i = 0; i < tempLength; i++) {
        if(returnVal[i].sum != null ){
          this.topSelling.push(returnVal[i]);
        }
      }
    });
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

  getCurrencies(){
    if(this.tryAmount > 9999){
      this.tryAmount = 9999
    }
    if(this.tryAmount < 1){
      this.tryAmount = 1
    }

    this.exchangeService.getAllExchangeRate().subscribe(returnVal => {
      this.exchangeRates = returnVal.rates;
      this.euro = (this.exchangeRates["EUR"] * this.tryAmount).toFixed(2);
      this.usd = (this.exchangeRates["USD"] * this.tryAmount).toFixed(2);
      this.gbp = (this.exchangeRates["GBP"] * this.tryAmount).toFixed(2);
      this.jpy = (this.exchangeRates["JPY"] * this.tryAmount).toFixed(2);
      this.mxn = (this.exchangeRates["MXN"] * this.tryAmount).toFixed(2);
      console.log(this.mxn);
    });
  }
}

