import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient);
  products = signal<Product[] | null>(null);
  private baseUrl = 'http://localhost:8080/api/products';

  getProducts() {
    this.httpClient
      .get<Product[]>(this.baseUrl)
      .subscribe({ next: (res) => this.products.set(res) });
  }
}
