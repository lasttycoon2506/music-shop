import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product';
import { environment } from '../../environment/environment.development';
import { ProductApiResponse } from '../models/productApiResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  products = signal<Product[] | null>(null);

  getProducts() {
    this.httpClient
      .get<ProductApiResponse>(this.baseUrl + 'products')
      .subscribe({
        next: (res) => {
          this.products.set(res._embedded.products);
        },
      });
  }
}
