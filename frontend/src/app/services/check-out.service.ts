import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentIntent } from '@stripe/stripe-js';
import { environment } from '../../environment/environment.development';
import { PaymentDto } from '../models/paymentDto';
import { Order } from '../models/order';
import { PurchaseDto } from '../models/purchaseDto';

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  private httpClient: HttpClient = inject(HttpClient);
  order: WritableSignal<Order | null> = signal<Order | null>({
    orderItems: [],
  });

  createPaymentIntent(payment: PaymentDto) {
    return this.httpClient.post<PaymentIntent>(
      environment.apiUrl + 'checkout/payment-intent',
      payment
    );
  }

  makePurchase(purchase: PurchaseDto) {
    return this.httpClient.post<string>(
      environment.apiUrl + 'checkout/purchase',
      purchase,
      { responseType: 'text' as 'json' }
    );
  }
}
