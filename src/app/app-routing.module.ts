import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { AdminProductComponent } from './components/admin-product/admin-product.component';
import { AdminGuard } from './guard/admin.guard';
import { CustomerGuard } from './guard/customer.guard';
import { VisitorGuard } from './guard/visitor.guard';
import { ProfileGuard } from './guard/profile.guard';
import { AdminCategoryComponent } from './components/admin-category/admin-category.component';
import { AdminOrderComponent } from './components/admin-order/admin-order.component';
import { AdminFavoriteComponent } from './components/admin-favorite/admin-favorite.component';
import { AdminRatingComponent } from './components/admin-rating/admin-rating.component';
import { AdminUserComponent } from './components/admin-user/admin-user.component';
import { AdminTopSellingComponent } from './components/admin-top-selling/admin-top-selling.component';


const routes: Routes = [
  {
    path : '',component:HomeComponent, canActivate:[VisitorGuard]
  },
  {
    path: 'product/:id', component:ProductComponent, canActivate:[VisitorGuard]
  },
  {
    path: 'cart',component:CartComponent, canActivate:[VisitorGuard]
  },
  {
    path: 'checkout',component:CheckoutComponent, canActivate:[CustomerGuard]
  },
  {
    path: 'thankyou', component:ThankyouComponent, canActivate:[CustomerGuard]
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
    path: 'myOrders', component: OrdersComponent, canActivate:[CustomerGuard]
  },
  {
    path: 'orderDetails', component: OrderDetailsComponent
  },
  {
    path: 'favorites', component: FavoritesComponent, canActivate:[CustomerGuard]
  },
  {
    path: 'products', component: AdminProductComponent, canActivate:[AdminGuard]
  },
  {
    path: 'categories', component: AdminCategoryComponent, canActivate:[AdminGuard]
  },
  {
    path: 'orders', component: AdminOrderComponent, canActivate:[AdminGuard]
  },
  {
    path: 'admin-favorites', component: AdminFavoriteComponent, canActivate:[AdminGuard]
  },
  {
    path: 'ratings', component: AdminRatingComponent, canActivate:[AdminGuard]
  },
  {
    path: 'users', component: AdminUserComponent, canActivate:[AdminGuard]
  },
  {
    path: 'top-selling', component: AdminTopSellingComponent, canActivate:[AdminGuard]
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
