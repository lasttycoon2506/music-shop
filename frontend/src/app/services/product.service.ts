import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product';
import { environment } from '../../environment/environment.development';
import { ProductsApiResponse } from '../models/productsApiResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  products = signal<Product[] | null>(null);

  getProducts() {
    this.httpClient
      .get<ProductsApiResponse>(this.baseUrl + 'products')
      .subscribe({
        next: (res) => {
          this.products.set(res._embedded.products);
        },
      });
  }

  getProductDetail(id: string): Observable<Product> {
    return this.httpClient.get<Product>(this.baseUrl + 'products/' + id);
  }
}
