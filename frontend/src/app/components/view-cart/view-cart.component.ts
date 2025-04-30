import { Component, inject } from '@angular/core';
import { CheckOutService } from '../../services/check-out.service';
import { CartItemCardComponent } from '../cart-item-card/cart-item-card.component';
import { CommonModule } from '@angular/common';
import { OrderItem } from '../../models/orderItem';

@Component({
  selector: 'app-view-cart',
  imports: [CartItemCardComponent, CommonModule],
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.css',
})
export class ViewCartComponent {
  checkoutService = inject(CheckOutService);

  calculateCartTotal(): number | undefined {
    return this.checkoutService
      .order()
      ?.orderItems?.reduce(
        (total, item) => total + (item.price ?? 0) * item.quantity,
        0
      );
  }

  deleteAllItem(item: OrderItem) {
    this.checkoutService.order.update((currentOrder) => {
      return {
        ...currentOrder,
        order: {
          ...currentOrder!.order,
          totalQuantity: currentOrder!.order!.totalQuantity - item.quantity,
        },
        orderItems: currentOrder!.orderItems!.filter(
          (orderItem) => orderItem.productId !== item.productId
        ),
      };
    });
  }
}
