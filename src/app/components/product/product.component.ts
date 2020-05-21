import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { map } from "rxjs/operators";
import { FavoriteService } from 'src/app/services/favorite.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { RatingService } from 'src/app/services/rating.service';

declare let $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements AfterViewInit, OnInit {
  id: Number;
  product;
  thumbimages: any[] = [];
  isFavorite: boolean = false;
  isStock: boolean = false;
  reviewCount: Number = 0;
  averageRating: Number = 0;
  processTitle: String = "0/10";
  rate = 0;
  isRating: boolean = false;

  @ViewChild('quantity') quantityInput;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private userService: UserService,
    private favoriteService: FavoriteService,
    private ratingService: RatingService,
    private toast: ToastrService) {
    // this.product = new ProductModelServer()
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(prodId => {
      this.id = prodId;


      if (this.userService.userData$.getValue() !== null) {
        //@ts-ignore
        var userId = this.userService.userData$.getValue().userId;
        this.favoriteService.getSingleFavorite(userId, this.id).subscribe((retVal) => {
          if (retVal.success) {
            this.isFavorite = true;
          }
        })
      }

      this.productService.getSingleProduct(this.id).subscribe(prod => {
        //@ts-ignore
        this.product = prod;
        console.log(this.product);
        if (prod.images !== null) {
          this.thumbimages = prod.images.split(';');
        }
        if (this.product.quantity <= 0) {
          this.isStock = true;
        }
      });

      this.getAverageRating();

      if(this.userService.userData$.getValue() != null){
        //@ts-ignore
        var userId = this.userService.userData$.getValue().userId;
        this.ratingService.getUserRating(userId, this.id).subscribe(retVal => {
          if(retVal.success == true){ // there is a rating
            this.rate = retVal.ratingObj[0].value;
            console.log(this.rate)
            this.isRating = true;
          }
        });
      }
      
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    // Product Main img Slick
    $('#product-main-img').slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: '#product-imgs',
    });

    // Product imgs Slick
    $('#product-imgs').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0,
      vertical: true,
      asNavFor: '#product-main-img',
      responsive: [{
        breakpoint: 991,
        settings: {
          vertical: false,
          arrows: false,
          dots: true,
        }
      },
      ]
    });

    // Product img zoom
    var zoomMainProduct = document.getElementById('product-main-img');
    if (zoomMainProduct) {
      $('#product-main-img .product-preview').zoom();
    }
  }

  getAverageRating(){
    this.ratingService.getAverageProductRating(this.id).subscribe(retVal => {
      if(retVal.success){
        this.reviewCount = retVal.count;
        this.averageRating = retVal.average * 10;
        if(retVal.average == Math.floor(retVal.average)){
          this.processTitle = retVal.average + ".0/10";
        }
        else{
          this.processTitle = retVal.average.toFixed(1) + "/10";
        }
      }
    });
  }
  addToCart(id: Number) {
    this.cartService.AddProductToCart(id, this.quantityInput.nativeElement.value);
  }

  Increase() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity >= 1) {
      value++;

      if (value > this.product.quantity) {
        // @ts-ignore
        value = this.product.quantity;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }

  Decrease() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity > 0) {
      value--;

      if (value <= 1) {
        // @ts-ignore
        value = 1;
      }
    } else {
      return;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }

  toggleFavorites() {
    if(this.userService.userData$.getValue() == null) {
      this.toast.error(`You need to login to add the product to favorites.`, "", {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
    else{
      //@ts-ignore
      var userId = this.userService.userData$.getValue().userId;
      if(this.isFavorite){
        this.favoriteService.removeFromFavorites(userId, this.id).subscribe((retVal) => {
          if (retVal.success) {
            this.isFavorite = false;
            this.toast.success(`Successfully removed from favorites.`, "", {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right'
            });
          }
          else{
            this.toast.error(`Something went wrong.`, "", {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right'
            });
          }
        });

      }
      else{
        this.favoriteService.addProductToFavorites(userId, this.id).subscribe((retVal) => {
          if (retVal.success) {
            this.isFavorite = true;
            this.toast.success(`Successfully added to favorites.`, "", {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right'
            });
          }
          else{
            this.toast.error(`Something went wrong.`, "", {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right'
            });
          }
        });
      }
    }
  }

  addReview(){
    if(this.userService.userData$.getValue() == null) {
      this.toast.error(`You need to login to add review.`, "", {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
    else{
      //@ts-ignore
      var userId = this.userService.userData$.getValue().userId;

      if(this.isRating){ //There is a rating for user
        this.ratingService.updateProductRating(userId, this.id, this.rate).subscribe(retVal => {
          if(retVal.success){
            this.toast.success(`Successfully updated.`, "", {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right'
            });
            this.getAverageRating();
          }
        });
      }
      else{ //First rating for user
        this.ratingService.addRatingToProduct(userId, this.id, this.rate).subscribe(retVal => {
          if(retVal.success){
            this.toast.success(`Successfully rated.`, "", {
              timeOut: 1500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right'
            });
            this.isRating = true;
            this.getAverageRating();
          }
        });
      }
    }
  }
}
