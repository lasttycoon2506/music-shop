import { Injectable, signal } from '@angular/core';
import { Order } from '../models/order';
import { OrderItems } from '../models/orderItems';

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  order = signal<Order | null>(null);
}
