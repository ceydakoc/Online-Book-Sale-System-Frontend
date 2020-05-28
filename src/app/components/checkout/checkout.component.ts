import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/cart.service";
import { CartModelServer } from "../../model/cart.model"
import { Router } from "@angular/router";
import { OrderService } from "../../services/order.service";
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, NgForm, Validators } from "@angular/forms";
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cartData: CartModelServer;
  cartTotal: Number;
  showSpinner: Boolean;
  checkoutForm: any;
  address: string = "";
  constructor(private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private toast: ToastrService
              /* private fb: FormBuilder*/) {


  }

  ngOnInit() {
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);

  }

  onCheckout() {

    if (this.address == "") {
      this.toast.error(`Please fill the address.`, "", {
        timeOut: 1500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      })
    }
    else {
      //@ts-ignore
      var userId = this.userService.userData$.getValue().userId;

      this.spinner.show().then(p => {
        this.cartService.CheckoutFromCart(userId, this.address);
      });
    }



    //console.log(this.checkoutForm.value);

  }
}
