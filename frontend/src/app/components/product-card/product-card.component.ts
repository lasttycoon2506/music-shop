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
    const existingOrderItem: OrderItem | undefined = this.checkoutService
      .order()
      ?.orderItems.find((id) => id.productId === productId);

    if (existingOrderItem) {
      existingOrderItem.quantity = existingOrderItem.quantity + 1;

      this.checkoutService.order.set({
        order: {
          totalQuantity:
            (this.checkoutService.order()?.order?.totalQuantity || 0) + 1,
        },
        orderItems: [existingOrderItem],
      });
    } else {
      this.checkoutService.order.set({
        order: {
          totalQuantity:
            (this.checkoutService.order()?.order?.totalQuantity || 0) + 1,
        },
        orderItems: [
          {
            imageUrl: this.product().imageUrl,
            price: this.product().price,
            quantity: 1,
            productId: productId,
          },
        ],
      });
    }
    console.log(this.checkoutService.order());
  }

  parseId(url: string): string {
    const productId = url.match(/\d+$/)![0];
    return productId;
  }
}
