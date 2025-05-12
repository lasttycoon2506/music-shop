import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Order } from '../models/order';
import { PaymentDto } from '../models/paymentDto';
import { HttpClient } from '@angular/common/http';
import { PaymentIntentResult } from '@stripe/stripe-js';
import { environment } from '../../environment/environment.development';
import { Observable } from 'rxjs';

type PurchaseRes = {
  trackingNumber: number;
};

@Injectable({
  providedIn: 'root',
})
export class CheckOutService {
  private httpClient: HttpClient = inject(HttpClient);
  order: WritableSignal<Order | null> = signal<Order | null>({
    orderItems: [],
  });

  createPaymentIntent(payment: PaymentDto): Observable<PaymentIntentResult> {
    return this.httpClient.post<PaymentIntentResult>(
      environment.apiUrl + 'checkout/payment-intent',
      payment
    );
  }

  makePurchase(order: Order): Observable<PurchaseRes> {
    return this.httpClient.post<PurchaseRes>(
      environment.apiUrl + 'checkout/purchase',
      order
    );
  }
}
