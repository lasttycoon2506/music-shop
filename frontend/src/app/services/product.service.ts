import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Product } from '../models/product';
import { environment } from '../../environment/environment.development';
import { ProductsApiResponse } from '../models/productsApiResponse';
import { map, Observable } from 'rxjs';
import { ProductsCategoriesApiResponse } from '../models/productsCategoriesApiResponse';
import { ProductCategory } from '../models/productCategory';
import { ParseProductId } from '../helpers/parseProductId';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = environment.apiUrl;
  products: WritableSignal<Product[]> = signal<Product[]>([]);
  currentPg: WritableSignal<number> = signal<number>(0);

  getAllProducts(): void {
    this.httpClient
      .get<ProductsApiResponse>(
        this.apiUrl + `products?page=${this.currentPg()}`
      )
      .subscribe({
        next: (res) => {
          this.products.set(res._embedded.products);
          this.products.update((products) =>
            products.map((product) => {
              product.productId = ParseProductId(product._links.self.href);
              return product;
            })
          );
        },
      });
  }

  getProductsByCategoryId(id: string): void {
    this.httpClient
      .get<ProductsApiResponse>(
        this.apiUrl + 'products/search/findByCategoryId?id=' + id
      )
      .subscribe({ next: (res) => this.products.set(res._embedded.products) });
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<ProductsCategoriesApiResponse>(this.apiUrl + 'product-category')
      .pipe(map((res) => res._embedded.productCategory));
  }

  getProductDetail(id: string): Observable<Product> {
    return this.httpClient.get<Product>(this.apiUrl + 'products/' + id);
  }

  getProductsByKeyword(keyword: string): void {
    this.httpClient
      .get<ProductsApiResponse>(
        this.apiUrl + 'products/search/findByNameContaining?name=' + keyword
      )
      .subscribe({ next: (res) => this.products.set(res._embedded.products) });
  }
}
