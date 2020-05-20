import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileGuard } from './guard/profile.guard';
import { RegisterComponent } from './components/register/register.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';


const routes: Routes = [
  {
    path : '',component:HomeComponent
  },
  {
    path: 'product/:id', component:ProductComponent
  },
  {
    path: 'cart',component:CartComponent
  },
  {
    path: 'checkout',component:CheckoutComponent, canActivate:[ProfileGuard]
  },
  {
    path: 'thankyou', component:ThankyouComponent
  },
  {
    path: 'login', component:LoginComponent
  },
  {
    path: 'profile', component:ProfileComponent, canActivate:[ProfileGuard]
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'myOrders', component: OrdersComponent
  },
  {
    path: 'orderDetails', component: OrderDetailsComponent
  },
  {
    path: '**', pathMatch: 'full', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
