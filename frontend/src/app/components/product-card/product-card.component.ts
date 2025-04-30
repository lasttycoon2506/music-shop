import { Component, inject, input, InputSignal } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CheckOutService } from '../../services/check-out.service';
import { OrderItem } from '../../models/orderItem';
import { Order } from '../../models/order';
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

  addItem(): void {
    const productId: number = this.parseProductId(
      this.product()._links.self.href
    );

    let currentOrder: Order | null = this.checkoutService.order();

    if (!currentOrder) {
      this.checkoutService.order.set({
        order: { totalQuantity: 0 },
      });
      currentOrder = this.checkoutService.order();
    }

    const existingOrderItem: OrderItem | undefined = (
      currentOrder?.orderItems ?? []
    ).find((id) => id.productId === productId);

    if (existingOrderItem) {
      const updatedOrderItems: OrderItem[] = currentOrder!.orderItems!.map(
        (item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
      );

      this.checkoutService.order.set({
        ...currentOrder,
        order: {
          ...currentOrder?.order,
          totalQuantity: currentOrder?.order?.totalQuantity! + 1,
        },
        orderItems: updatedOrderItems,
      });
    } else {
      const newOrderItem: OrderItem = {
        imageUrl: this.product().imageUrl,
        price: this.product().price,
        quantity: 1,
        productId: productId,
      };

      this.checkoutService.order.set({
        ...currentOrder,
        order: {
          ...currentOrder?.order,
          totalQuantity: currentOrder?.order?.totalQuantity! + 1,
        },
        orderItems: [...(currentOrder?.orderItems ?? []), newOrderItem],
      });
    }
  }
}
