import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { OrderService } from './order.service';
import { environment } from 'src/environments/environment';
import { CartModelPublic, CartModelServer } from '../model/cart.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ProductModelServer } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  ServerURL = environment.SERVER_URL;

  // This will be sent to the backend Server as post data
  private cartDataClient: CartModelPublic = { prodData: [{ incart: 0, id: 0 }], total: 0 };

  // Cart Data variable to store the cart information on the server
  private cartDataServer: CartModelServer = {
    data: [{
      product: undefined,
      numInCart: 0
    }],
    total: 0
  };

  cartTotal$ = new BehaviorSubject<Number>(0);

  // Data variable to store the cart information on the client's local storage

  cartDataObs$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);

  constructor(private http: HttpClient,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router) {

    this.cartTotal$.next(this.cartDataServer.total);
    this.cartDataObs$.next(this.cartDataServer);


    //Get the information from local storage (if any)
    let info: CartModelPublic = JSON.parse(localStorage.getItem('cart'));

    //Check if  the info variable is null or has some data it in

    if (info !== null && info !== undefined && info.prodData[0].incart !== 0) {
      //Local storage is not empty and has some information
      // assign the value to our data variable which corresponds to the LocalStorage data format
      this.cartDataClient = info;
      // Loop through each entry and put it in the cartDataServer object
      this.cartDataClient.prodData.forEach(p => {
        this.productService.getSingleProduct(p.id).subscribe((actualProdInfo: ProductModelServer) => {
          if (this.cartDataServer.data[0].numInCart === 0) {
            this.cartDataServer.data[0].numInCart = p.incart;
            this.cartDataServer.data[0].product = actualProdInfo;
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          } else {
            //CartData Server already has some entry it in
            this.cartDataServer.data.push({
              numInCart: p.incart,
              product: actualProdInfo
            });
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          }
          this.cartDataObs$.next({...this.cartDataServer});
        });
      });
    }
  }


  private CalculateTotal() {
    let Total = 0;

    this.cartDataServer.data.forEach(p => {
      const {numInCart} = p;
      const {price} = p.product;
      // @ts-ignore
      Total += numInCart * price;
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }
  
}
