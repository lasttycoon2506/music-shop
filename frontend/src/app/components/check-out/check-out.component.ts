import { Component, inject, OnInit } from '@angular/core';
import {
  loadStripe,
  Stripe,
  StripeCardElement,
  StripeElements,
} from '@stripe/stripe-js';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ParseProductId } from '../../helpers/parseProductId';
import { STATES_ABBREVIATIONS } from '../../constants/states.constants';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { OktaService } from '../../services/okta.service';
import { environment } from '../../../environment/environment.development';
import { CheckOutService } from '../../services/check-out.service';
import { PaymentDto } from '../../models/paymentDto';

@Component({
  selector: 'app-check-out',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent implements OnInit {
  private productService: ProductService = inject(ProductService);
  checkoutService: CheckOutService = inject(CheckOutService);
  customerService: CustomerService = inject(CustomerService);
  oktaService: OktaService = inject(OktaService);
  stripeApi: Stripe | null = null;
  billingShippingSame: boolean = false;
  products: Product[] = [];
  STATES_ABBREVIATIONS: string[] = STATES_ABBREVIATIONS;
  creditCardElement: StripeCardElement | undefined;
  creditCardErrors: HTMLElement | null = null;
  checkoutForm: FormGroup = new FormGroup({
    billingFirstName: new FormControl(
      this.customerService.currentCustomer()?.billingAddress?.firstName ?? '',
      Validators.required
    ),
    billingLastName: new FormControl(
      this.customerService.currentCustomer()?.billingAddress?.lastName ?? '',
      Validators.required
    ),
    billingStreet: new FormControl(
      this.customerService.currentCustomer()?.billingAddress?.street ?? '',
      Validators.required
    ),
    billingCity: new FormControl(
      this.customerService.currentCustomer()?.billingAddress?.city ?? '',
      Validators.required
    ),
    billingState: new FormControl(
      this.customerService.currentCustomer()?.billingAddress?.state ?? '',
      Validators.required
    ),
    billingZip: new FormControl(
      this.customerService.currentCustomer()?.billingAddress?.zip.toString() ??
        '',
      [Validators.pattern(/^[0-9]{5}$/), Validators.required]
    ),
    shippingFirstName: new FormControl(
      this.customerService.currentCustomer()?.shippingAddress?.firstName ?? '',
      Validators.required
    ),
    shippingLastName: new FormControl(
      this.customerService.currentCustomer()?.shippingAddress?.lastName ?? '',
      Validators.required
    ),
    shippingStreet: new FormControl(
      this.customerService.currentCustomer()?.shippingAddress?.street ?? '',
      Validators.required
    ),
    shippingCity: new FormControl(
      this.customerService.currentCustomer()?.shippingAddress?.city ?? '',
      Validators.required
    ),
    shippingState: new FormControl(
      this.customerService.currentCustomer()?.shippingAddress?.state ?? '',
      Validators.required
    ),
    shippingZip: new FormControl(
      this.customerService.currentCustomer()?.shippingAddress?.zip ?? '',
      [Validators.pattern(/^[0-9]{5}$/), Validators.required]
    ),
  });

  ngOnInit() {
    loadStripe(environment.StripePublishableKey).then((stripe) => {
      this.stripeApi = stripe;
    });
    this.checkoutService.order()?.orderItems?.forEach((item) =>
      this.productService
        .getProductDetail((item.productId ?? '').toString())
        .subscribe({
          next: (product) => {
            this.products.push(product);
            product.productId = ParseProductId(product._links.self.href);
          },
        })
    );
    this.initStripePaymentForm();
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((product) => product.productId === id);
  }

  calculateCartTotal(): number | undefined {
    return this.checkoutService
      .order()
      ?.orderItems?.reduce(
        (total, item) => total + (item.price ?? 0) * item.quantity,
        0
      );
  }

  placeOrder() {
    const payment: PaymentDto = {
      amount: this.calculateCartTotal()! * 100,
      email: this.oktaService.currentUser()!.email,
    };

    this.checkoutService.createPaymentIntent(payment).subscribe({
      next: (paymentIntentRes) => {
        this.stripeApi?.confirmCardPayment(
          paymentIntentRes.paymentIntent!.client_secret!,
          {}
        );
      },
    });
  }

  sameAddressToggle(): void {
    this.billingShippingSame = !this.billingShippingSame;
    if (this.billingShippingSame) {
      this.checkoutForm.patchValue({
        shippingFirstName: this.checkoutForm.get('billingFirstName')?.value,
        shippingLastName: this.checkoutForm.get('billingLastName')?.value,
        shippingStreet: this.checkoutForm.get('billingStreet')?.value,
        shippingCity: this.checkoutForm.get('billingCity')?.value,
        shippingState: this.checkoutForm.get('billingState')?.value,
        shippingZip: this.checkoutForm.get('billingZip')?.value,
      });
    } else {
      this.checkoutForm.setValue({
        shippingFirstName:
          this.customerService.currentCustomer()?.shippingAddress?.firstName,
        shippingLastName:
          this.customerService.currentCustomer()?.shippingAddress?.lastName,
        shippingStreet:
          this.customerService.currentCustomer()?.shippingAddress?.street,
        shippingCity:
          this.customerService.currentCustomer()?.shippingAddress?.city,
        shippingState:
          this.customerService.currentCustomer()?.shippingAddress?.state,
        shippingZip:
          this.customerService.currentCustomer()?.shippingAddress?.zip,
      });
    }
  }

  initStripePaymentForm() {
    const stripeElements: StripeElements | undefined =
      this.stripeApi?.elements();

    this.creditCardElement = stripeElements?.create('card');
    this.creditCardElement?.mount('#credit-card-element');
    if (this.creditCardElement) {
      this.creditCardElement.on('change', (event) => {
        this.creditCardErrors = document.getElementById('credit-card-errors');

        if (event.complete) {
          this.creditCardErrors!.textContent = '';
        } else if (event.error) {
          this.creditCardErrors!.textContent = event.error.message;
        }
      });
    }
  }
}
