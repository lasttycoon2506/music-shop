import { Component, inject } from '@angular/core';
import { CheckOutService } from '../../services/check-out.service';
import { CartItemCardComponent } from '../cart-item-card/cart-item-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-cart',
  imports: [CartItemCardComponent, CommonModule],
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.css',
})
export class ViewCartComponent {
  checkoutService = inject(CheckOutService);

  CalculateCartTotal(): number | undefined {
    const total = this.checkoutService
      .order()
      ?.orderItems?.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

    return total;
  }
}
