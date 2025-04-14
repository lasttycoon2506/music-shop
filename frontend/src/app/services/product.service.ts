import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product';
import { environment } from '../../environment/environment.development';
import { ProductsApiResponse } from '../models/productsApiResponse';
import { map, Observable } from 'rxjs';
import { ProductsCategoriesApiResponse } from '../models/productsCategoriesApiResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  products = signal<Product[] | null>(null);

  getAllProducts() {
    this.httpClient
      .get<ProductsApiResponse>(this.baseUrl + 'products')
      .subscribe({
        next: (res) => {
          this.products.set(res._embedded.products);
        },
      });
  }

  getProductsByCategoryId(id: string) {
    this.httpClient
      .get<ProductsApiResponse>(
        this.baseUrl + 'products/search/findByCategoryId?id=' + id
      )
      .subscribe({ next: (res) => this.products.set(res._embedded.products) });
  }

  getProductCategories() {
    return this.httpClient
      .get<ProductsCategoriesApiResponse>(this.baseUrl + 'product-category')
      .pipe(map((res) => res._embedded.productCategory));
  }

  getProductDetail(id: string): Observable<Product> {
    return this.httpClient.get<Product>(this.baseUrl + 'products/' + id);
  }
}
