import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { CheckOutService } from '../../services/check-out.service';
import { OrderItem } from '../../models/orderItem';
import { ParseProductId } from '../../helpers/parseProductId';
import { OktaService } from '../../services/okta.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  private router = inject(ActivatedRoute);
  private checkoutService = inject(CheckOutService);
  oktaService = inject(OktaService);
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
  currentOrder: Signal<Order | null> = computed(() =>
    this.checkoutService.order()
  );

  ngOnInit(): void {
    this.router.data.subscribe({
      next: (data) => {
        this.product = data['product'];
      },
    });
    this.product.productId = ParseProductId(this.product._links.self.href);
  }

  setNewItemQuantity(event: Event) {
    const newQuantity: number = parseInt(
      (event.target as HTMLInputElement).value
    );

    this.checkoutService.order.update((currentOrder) => {
      return {
        ...currentOrder,
        order: {
          totalQuantity:
            (currentOrder?.order?.totalQuantity ?? 0) -
            (this.item().quantity - newQuantity),
        },
        orderItems: (
          currentOrder?.orderItems ?? [
            { ...this.item(), quantity: newQuantity },
          ]
        ).map((orderItem) =>
          orderItem.productId === this.item()!.productId
            ? { ...orderItem, quantity: newQuantity }
            : orderItem
        ),
      };
    });
  }

  addOneItem() {
    if (this.currentOrder()) {
      this.checkoutService.order.update((currentOrder) => {
        return {
          ...currentOrder,
          order: {
            ...currentOrder!.order,
            totalQuantity: currentOrder!.order!.totalQuantity + 1,
          },
          orderItems: currentOrder!.orderItems!.map((orderItem) =>
            orderItem.productId === this.item()!.productId
              ? { ...orderItem, quantity: orderItem.quantity + 1 }
              : orderItem
          ),
        };
      });
    } else {
      const newOrderItem: OrderItem = {
        price: this.product.price,
        productId: this.product.productId,
        imageUrl: this.item()?.imageUrl,
        quantity: 1,
      };

      this.checkoutService.order.set({
        order: { totalQuantity: 1 },
        orderItems: [newOrderItem],
      });
    }
  }

  subtractOneItem() {
    this.checkoutService.order.update((currentOrder) => {
      return {
        ...currentOrder,
        order: {
          ...currentOrder!.order,
          totalQuantity: currentOrder!.order!.totalQuantity - 1,
        },
        orderItems: currentOrder!.orderItems!.map((orderItem) =>
          orderItem.productId === this.item()!.productId
            ? { ...orderItem, quantity: orderItem.quantity - 1 }
            : orderItem
        ),
      };
    });
  }
}

// "version": "0.2.0",
// "configurations": [
//   {
//     "name": "ng serve",
//     "type": "chrome",
//     "request": "launch",
//     "preLaunchTask": "npm: start",
//     "url": "http://localhost:4200/"
//   },
