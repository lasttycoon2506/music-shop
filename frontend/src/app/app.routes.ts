import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { productDetailResolver } from './resolvers/product-detail-resolver.resolver';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
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
];
