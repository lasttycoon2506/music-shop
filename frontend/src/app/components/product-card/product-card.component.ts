import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CheckOutService } from '../../services/check-out.service';
import { OktaService } from '../../services/okta.service';
import { Product } from '../../models/product';
import { OrderItem } from '../../models/orderItem';

@Component({
  selector: 'product-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private checkoutService: CheckOutService = inject(CheckOutService);
  oktaService: OktaService = inject(OktaService);
  product: InputSignal<Product> = input.required<Product>();
  item: Signal<OrderItem> = computed(
    () =>
      this.checkoutService
        .order()
        ?.orderItems?.find(
          (orderItem) => orderItem.productId === this.product().productId
        ) ?? {
        quantity: 0,
        imageUrl: this.product().imageUrl,
        price: this.product().price,
        productId: this.product().productId,
      }
  );

  addItem(): void {
    const itemExistsInCart: boolean = this.checkoutService
      .order()!
      .orderItems!.includes(this.item());

    if (!itemExistsInCart) {
      this.checkoutService.order.update((currentOrder) => {
        return {
          ...currentOrder,
          order: {
            totalQuantity: (currentOrder?.order?.totalQuantity ?? 0) + 1,
          },
          orderItems: [
            ...currentOrder!.orderItems!,
            { ...this.item(), quantity: this.item().quantity + 1 },
          ],
        };
      });
    } else {
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
  }
}
