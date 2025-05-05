import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  currentCustomer = signal<>;
  getCustomer() {}
}
