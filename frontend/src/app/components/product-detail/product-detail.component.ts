import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { CheckOutService } from '../../services/check-out.service';
import { OrderItem } from '../../models/orderItem';
import { OktaService } from '../../services/okta.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  private router = inject(ActivatedRoute);
  private checkoutService = inject(CheckOutService);
  oktaService = inject(OktaService);
  product!: Product;
  newQuantity: number = 0;
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
    this.router.data.subscribe({
      next: (data) => {
        this.product = data['product'];
      },
    });
  }

  setNewItemQuantity(): void {
    if (this.newQuantity < 0) this.newQuantity = 0;

    this.checkoutService.order.update((currentOrder) => {
      return {
        ...currentOrder,
        order: {
          ...currentOrder?.order,
          totalQuantity:
            (currentOrder?.order?.totalQuantity ?? 0) -
            (this.item().quantity - this.newQuantity),
        },
        orderItems:
          currentOrder!.orderItems!.length === 0
            ? [{ ...this.item(), quantity: this.newQuantity }]
            : currentOrder!.orderItems!.map((orderItem) =>
                orderItem.productId === this.item()!.productId
                  ? { ...orderItem, quantity: this.newQuantity }
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
        orderItems: (
          currentOrder?.orderItems ?? [{ ...this.item(), quantity: 1 }]
        ).map((orderItem) =>
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
