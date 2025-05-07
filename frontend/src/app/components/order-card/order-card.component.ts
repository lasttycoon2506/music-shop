import { Component, input, InputSignal } from '@angular/core';
import { Order } from '../../models/order';

@Component({
  selector: 'app-order-card',
  imports: [],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css',
})
export class OrderCardComponent {
  order: InputSignal<Order> = input.required<Order>();
}
