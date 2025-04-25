import { Component, inject } from '@angular/core';
import { CheckOutService } from '../../services/check-out.service';
import { CartItemCardComponent } from '../cart-item-card/cart-item-card.component';

@Component({
  selector: 'app-view-cart',
  imports: [CartItemCardComponent],
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.css',
})
export class ViewCartComponent {
  checkoutService = inject(CheckOutService);
}
