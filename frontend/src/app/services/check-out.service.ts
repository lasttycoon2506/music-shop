import { Injectable, signal, WritableSignal } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  order: WritableSignal<Order | null> = signal<Order | null>({
    orderItems: [],
  });

  createPaymentIntent() {}
}
