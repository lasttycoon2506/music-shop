import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product';
import { ApiResponse } from '../models/apiResponse';
import { environment } from '../../environment/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  products = signal<Product[] | null>(null);

  getProducts() {
    this.httpClient.get<ApiResponse>(this.baseUrl + 'products').subscribe({
      next: (res) => {
        this.products.set(res._embedded.products);
      },
    });
  }
}
