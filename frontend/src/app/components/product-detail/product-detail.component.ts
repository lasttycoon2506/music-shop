import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CheckOutService } from '../../services/check-out.service';
import { OktaService } from '../../services/okta.service';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product';
import { OrderItem } from '../../models/orderItem';
import { ParseProductId } from '../../helpers/parseProductId';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  private router: ActivatedRoute = inject(ActivatedRoute);
  private checkoutService: CheckOutService = inject(CheckOutService);
  oktaService: OktaService = inject(OktaService);
  product!: Product;
  item: Signal<OrderItem> = computed(
    () =>
      this.checkoutService
        .order()
        ?.orderItems?.find(
          (orderItem) => orderItem.productId === this.product.productId
        ) ?? {
        quantity: 0,
        imageUrl: this.product.imageUrl,
        price: this.product.price,
        productId: this.product.productId,
      }
  );

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'instant' });
    this.router.data.subscribe({
      next: (data) => {
        this.product = data['product'];
        this.product.productId = ParseProductId(this.product._links.self.href);
      },
    });
  }

  setNewItemQuantity(event: Event): void {
    let newQuantity: number = parseInt(
      (event.target as HTMLInputElement).value
    );

    if (newQuantity < 0) {
      newQuantity = 0;
      const quantityInputEl = event.target as HTMLInputElement;
      quantityInputEl.value = '0';
    }

    this.checkoutService.order.update((currentOrder) => {
      return {
        ...currentOrder,
        order: {
          ...currentOrder?.order,
          totalQuantity:
            (currentOrder?.order?.totalQuantity ?? 0) -
            (this.item().quantity - newQuantity),
        },
        orderItems:
          currentOrder!.orderItems!.length === 0 && newQuantity !== 0
            ? [{ ...this.item(), quantity: newQuantity }]
            : currentOrder!.orderItems!.map((orderItem) =>
                orderItem.productId === this.item()!.productId
                  ? { ...orderItem, quantity: newQuantity }
                  : orderItem
              ),
      };
    });
  }

  addOneItem(): void {
    this.checkoutService.order.update((currentOrder) => {
      return {
        ...currentOrder,
        order: {
          totalQuantity: (currentOrder?.order?.totalQuantity ?? 0) + 1,
        },
        orderItems:
          currentOrder!.orderItems!.length === 0
            ? [{ ...this.item(), quantity: 1 }]
            : currentOrder!.orderItems!.map((orderItem) =>
                orderItem.productId === this.item()!.productId
                  ? { ...orderItem, quantity: this.item().quantity + 1 }
                  : orderItem
              ),
      };
    });
  }

  subtractOneItem(): void {
    this.checkoutService.order.update((currentOrder) => {
      return {
        ...currentOrder,
        order: {
          totalQuantity: (currentOrder?.order?.totalQuantity ?? 0) - 1,
        },
        orderItems: currentOrder!.orderItems!.map((orderItem) =>
          orderItem.productId === this.item()!.productId
            ? { ...orderItem, quantity: this.item().quantity - 1 }
            : orderItem
        ),
      };
    });
  }
}
