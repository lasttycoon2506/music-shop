import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl: string = 'http://localhost:8080/api/products';
  private httpClient = inject(HttpClient);
  products = signal<Product[]>;
}
