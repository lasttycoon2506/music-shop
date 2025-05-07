import { Component, inject, OnInit } from '@angular/core';
import { CheckOutService } from '../../services/check-out.service';
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

@Component({
  selector: 'app-check-out',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent implements OnInit {
  private productService: ProductService = inject(ProductService);
  private customerService: CustomerService = inject(CustomerService);
  checkoutService: CheckOutService = inject(CheckOutService);
  billingShippingSame: boolean = false;
  products: Product[] = [];
  STATES_ABBREVIATIONS: string[] = STATES_ABBREVIATIONS;
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

  ngOnInit(): void {
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
    console.log(this.checkoutForm.get('billingZip')?.hasError('pattern'));
  }

  sameAddressToggle(event: Event): void {
    const isChecked: boolean = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.billingShippingSame = true;
      this.checkoutForm.patchValue({
        shippingFirstName: this.checkoutForm.get('billingFirstName')?.value,
        shippingLastName: this.checkoutForm.get('billingLastName')?.value,
        shippingStreet: this.checkoutForm.get('billingStreet')?.value,
        shippingCity: this.checkoutForm.get('billingCity')?.value,
        shippingState: this.checkoutForm.get('billingState')?.value,
        shippingZip: this.checkoutForm.get('billingZip')?.value,
      });
    } else {
      this.billingShippingSame = false;
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
}
