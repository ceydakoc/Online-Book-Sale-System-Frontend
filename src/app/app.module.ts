import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { FooterComponent } from './components/footer/footer.component'
import { HttpClientModule } from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {NgxSpinnerModule} from "ngx-spinner";
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import {AuthServiceConfig, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { OrdersComponent } from './components/orders/orders.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgPipesModule} from 'ngx-pipes';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { BarRatingModule } from "ngx-bar-rating";
import { OrderModule } from 'ngx-order-pipe';
import { AdminProductComponent } from './components/admin-product/admin-product.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('799705726167-vn6184fsovmps0kpbg5c7jabv15r3ias.apps.googleusercontent.com')
  }

]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    ProductComponent,
    ThankyouComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    OrdersComponent,
    OrderDetailsComponent,
    FavoritesComponent,
    AdminProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    Ng2SearchPipeModule,
    NgPipesModule,
    NgxPaginationModule,
    NgCircleProgressModule.forRoot(),
    BarRatingModule,
    OrderModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
