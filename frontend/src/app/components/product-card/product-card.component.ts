import { Component, inject, input } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CheckOutService } from '../../services/check-out.service';
import { OrderItem } from '../../models/orderItem';

@Component({
  selector: 'product-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private checkoutService = inject(CheckOutService);
  product = input.required<Product>();

  addItem() {
    const productId: number = parseInt(
      this.parseId(this.product()._links.self.href)
    );

    const currentOrder = this.checkoutService.order();
    const existingOrderItem: OrderItem | undefined =
      currentOrder?.orderItems.find((id) => id.productId === productId);

    if (existingOrderItem) {
      const updatedOrderItem = currentOrder!.orderItems.map((item) =>
        item.productId === productId ? { ...item, quantity: 1 } : item
      );
      this.checkoutService.order.set({
        ...currentOrder,
        order: {
          ...currentOrder?.order,
          totalQuantity: currentOrder?.order?.totalQuantity! + 1,
        },
        orderItems: [updatedOrderItem[0]],
      });
    } else {
      console.log(1 + currentOrder?.order?.totalQuantity!);
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

    // console.log(this.checkoutService.order());
  }

  parseId(url: string): string {
    const productId = url.match(/\d+$/)![0];
    return productId;
  }
}
