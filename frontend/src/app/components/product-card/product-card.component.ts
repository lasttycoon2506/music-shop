import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CheckOutService } from '../../services/check-out.service';
import { OrderItem } from '../../models/orderItem';
import { ParseProductId } from '../../helpers/parseProductId';
import { OktaService } from '../../services/okta.service';

@Component({
  selector: 'product-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private checkoutService = inject(CheckOutService);
  oktaService = inject(OktaService);
  product: InputSignal<Product> = input.required<Product>();
  parseProductId = ParseProductId;
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
