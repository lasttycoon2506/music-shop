import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Customer } from '../models/customer';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl: string = environment.apiUrl;
  currentCustomer: WritableSignal<Customer | null> = signal<Customer | null>(
    null
  );

  getCustomer(email: string): void {
    this.httpClient
      .get<Customer>(
        this.apiUrl + 'customers/search/findByEmail?email=' + email
      )
      .subscribe({
        next: (res) => {
          this.currentCustomer.set(res);
        },
      });
  }

  editCustomer(customer: Customer): void {
    this.httpClient
      .put<Response>(this.apiUrl + 'customer/edit', customer)
      .subscribe({
        next: (res) => {
          if (res) {
            this.currentCustomer.set(customer);
          }
        },
      });
  }
}
