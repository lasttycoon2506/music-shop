import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaymentIntentResult } from '@stripe/stripe-js';
import { environment } from '../../environment/environment.development';
import { Observable } from 'rxjs';

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

  makePurchase(): Observable<PurchaseResponse> {
    return this.httpClient.post<PurchaseResponse>(
      environment.apiUrl + 'checkout/purchase',
      this.order()
    );
  }
}
