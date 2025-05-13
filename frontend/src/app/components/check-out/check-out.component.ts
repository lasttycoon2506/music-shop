import { Component, inject, OnInit } from '@angular/core';
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
import {
  loadStripe,
  PaymentIntent,
  Stripe,
  StripeCardElement,
  StripeElements,
} from '@stripe/stripe-js';
import { Product } from '../../models/product';
import { PaymentDto } from '../../models/paymentDto';
import { PurchaseDto } from '../../models/purchaseDto';

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
  billingShippingSame: boolean = false;
  products: Product[] = [];
  cartTotal: number = 0;
  STATES_ABBREVIATIONS: string[] = STATES_ABBREVIATIONS;
  stripeApi: Stripe | null = null;
  creditCardInvalid: boolean = true;
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
    this.cartTotal = this.calculateCartTotal();
    this.initStripe().then(() => this.initStripePaymentForm());
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
  }

  async initStripe() {
    const stripe = await loadStripe(environment.StripePublishableKey);
    this.stripeApi = stripe;
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((product) => product.productId === id);
  }

  calculateCartTotal(): number {
    if (
      this.checkoutService.order()?.order?.totalQuantity === 0 ||
      !this.checkoutService.order()?.order
    ) {
      return 0;
    } else {
      return this.checkoutService
        .order()!
        .orderItems!.reduce(
          (total, item) => total + (item.price ?? 0) * item.quantity,
          0
        );
    }
  }

  placeOrder() {
    const payment: PaymentDto = {
      amount: Math.round(this.cartTotal * 100),
      email: this.oktaService.currentUser()!.email,
    };

    this.checkoutService.createPaymentIntent(payment).subscribe({
      next: (res: PaymentIntent) => {
        this.stripeApi
          ?.confirmCardPayment(
            res.client_secret!,
            {
              payment_method: {
                card: this.creditCardElement!,
                billing_details: {
                  name: this.checkoutForm.get('billingFirstName')!.value,
                  email: this.oktaService.currentUser()?.email,
                  address: {
                    line1: this.checkoutForm.get('billingStreet')!.value,
                    city: this.checkoutForm.get('billingCity')!.value,
                    state: this.checkoutForm.get('billingState')!.value,
                    postal_code: this.checkoutForm.get('billingZip')!.value,
                  },
                },
              },
            },
            { handleActions: false }
          )
          .then((result) => {
            if (result.error) {
              alert('Error Processing Payment!' + result.error.message);
            } else {
              const newPurchase: PurchaseDto = {
                customer: {
                  firstName: this.customerService.currentCustomer()!.firstName,
                  lastName: this.customerService.currentCustomer()!.lastName,
                  email: this.customerService.currentCustomer()!.email ?? '',
                },
                billingAddress: {
                  firstName: this.checkoutForm.get('billingFirstName')!.value,
                  lastName: this.checkoutForm.get('billingLastName')!.value,
                  street: this.checkoutForm.get('billingStreet')!.value,
                  city: this.checkoutForm.get('billingCity')!.value,
                  state: this.checkoutForm.get('billingState')!.value,
                  zip: this.checkoutForm.get('billingZip')!.value,
                },
                shippingAddress: {
                  firstName: this.checkoutForm.get('shippingFirstName')!.value,
                  lastName: this.checkoutForm.get('shippingLastName')!.value,
                  street: this.checkoutForm.get('shippingStreet')!.value,
                  city: this.checkoutForm.get('shippingCity')!.value,
                  state: this.checkoutForm.get('shippingState')!.value,
                  zip: this.checkoutForm.get('shippingZip')!.value,
                },
                order: {
                  totalPrice: this.cartTotal,
                  totalQuantity:
                    this.checkoutService.order()!.order!.totalQuantity!,
                  status: 'placed',
                },
                orderItems: this.checkoutService.order()!.orderItems!,
              };

              this.checkoutService.makePurchase(newPurchase).subscribe({
                next: (res) => {
                  console.log(res);
                  // use custom alert component
                  alert('Order made! Tracking Number: ' + res);
                },
                error: (error) => {
                  console.log(error);
                  alert('Error placing order!: ' + error.message);
                },
              });
            }
          });
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
    if (this.stripeApi) {
      const stripeElements: StripeElements = this.stripeApi.elements();

      this.creditCardElement = stripeElements?.create('card');

      this.creditCardElement?.mount('#credit-card-element');
      if (this.creditCardElement) {
        this.creditCardElement.on('change', (event) => {
          if (!event.complete) {
            this.creditCardInvalid = true;
          }

          this.creditCardErrors = document.getElementById('credit-card-errors');

          if (event.complete) {
            this.creditCardInvalid = false;
            this.creditCardErrors!.textContent = '';
          } else if (event.error) {
            this.creditCardErrors!.textContent = event.error.message;
          }
        });
      }
    }
  }
}
