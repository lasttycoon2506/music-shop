import { inject, Injectable, signal } from '@angular/core';
import { Customer } from '../models/customer';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private httpClient = inject(HttpClient);
  private apiUrl: string = environment.apiUrl;
  currentCustomer = signal<Customer | null>(null);

  getCustomer(email: string) {
    this.httpClient
      .get<Customer>(
        this.apiUrl + 'customers/search/findByEmail?email=' + email
      )
      .subscribe({
        next: (res) => this.currentCustomer.set(res),
      });
  }

  editCustomer(customer: Customer) {
    this.httpClient
      .post(this.apiUrl + 'customer/create', { customer })
      .subscribe({
        next: (res) => {
          if (res) {
            console.log(res);
            this.currentCustomer.set(customer);
          }
        },
      });
  }
}
