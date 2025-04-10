import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product';
import { ApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);
  products = signal<Product[] | null>(null);
  private baseUrl = 'http://localhost:8080/api/products';

  getProducts() {
    this.httpClient.get<ApiResponse>(this.baseUrl).subscribe({
      next: (res) => {
        this.products.set(res._embedded.products);
        console.log(res._embedded);
      },
    });
  }
}
