import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { productDetailResolver } from './resolvers/product-detail-resolver.resolver';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ViewCartComponent } from './components/view-cart/view-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
  {
    path: 'login/callback',
    component: OktaCallbackComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'products/:id',
    resolve: { product: productDetailResolver },
    component: ProductDetailComponent,
  },
  {
    path: 'category/:id',
    component: ProductListComponent,
  },
  {
    path: 'products/search/:name',
    component: ProductListComponent,
  },
  {
    path: 'view-cart',
    component: ViewCartComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'checkout',
    component: CheckOutComponent,
  },
  { path: '', component: ProductListComponent },
];
