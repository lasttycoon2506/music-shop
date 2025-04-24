import { Injectable, signal } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  shoppingCart = signal<Order | null>(null);
}
