import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl: string = 'http://localhost:8080/api/products';
  private httpClient = inject(HttpClient);
  products = signal<Product[] | null>(null);

  getProducts() {
    this.httpClient.get<Product[]>(this.apiUrl).subscribe({
      next: (res) => {
        this.products.set(res);
      },
    });
  }
}
