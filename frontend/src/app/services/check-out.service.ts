import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentIntent } from '@stripe/stripe-js';
import { environment } from '../../environment/environment.development';
import { Observable } from 'rxjs';
import { PaymentDto } from '../models/paymentDto';
import { PurchaseResponse } from '../models/purchaseRes';
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

  makePurchase(purchase: PurchaseDto): Observable<PurchaseResponse> {
    return this.httpClient.post<PurchaseResponse>(
      environment.apiUrl + 'checkout/purchase',
      this.order()
    );
  }
}
