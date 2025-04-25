import { Component, input } from '@angular/core';
import { OrderItem } from '../../models/orderItem';

@Component({
  selector: 'cart-item-card',
  imports: [],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.css',
})
export class CartItemCardComponent {
  item = input.required<OrderItem>();
}
