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
  item: Signal<OrderItem | null> = computed(
    () =>
      this.checkoutService
        .order()
        ?.orderItems?.find(
          (orderItem) => orderItem.productId === this.product.productId
        ) ?? null
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

    const existingOrderItem = this.checkoutService
      .order()
      ?.orderItems?.find((item) => item.productId === this.product.productId);

    // if (existingOrderItem) {
    //   this.item( = existingOrderItem;
    // } else {
    //   this.item = { quantity: 0 };
    // }
  }

  setNewItemQuantity(event: Event) {
    const newQuantity: number = parseInt(
      (event.target as HTMLInputElement).value
    );

    if (this.currentOrder()) {
      this.checkoutService.order.update((currentOrder) => {
        return {
          ...currentOrder,
          order: {
            ...currentOrder!.order,
            totalQuantity:
              currentOrder!.order!.totalQuantity -
              (currentOrder!.orderItems!.find(
                (orderItem) => orderItem.productId === this.item()!.productId
              )?.quantity! -
                newQuantity),
          },
          orderItems: currentOrder!.orderItems!.map((orderItem) =>
            orderItem.productId === this.item()!.productId
              ? { ...orderItem, quantity: newQuantity }
              : orderItem
          ),
        };
      });
    } else {
      const newOrderItem: OrderItem = {
        price: this.item()?.price,
        productId: this.item()?.productId,
        imageUrl: this.item()?.imageUrl,
        quantity: newQuantity,
      };

      this.checkoutService.order.set({
        order: { totalQuantity: newQuantity },
        orderItems: [newOrderItem],
      });
    }
  }

  addOneNewItem() {
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
}
