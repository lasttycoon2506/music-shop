import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { CheckOutService } from '../../services/check-out.service';
import { OrderItem } from '../../models/orderItem';
import { ParseProductId } from '../../helpers/parseProductId';
import { OktaService } from '../../services/okta.service';

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

  subtractOneItem() {
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
