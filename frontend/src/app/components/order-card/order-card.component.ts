import { Component, input, InputSignal } from '@angular/core';
import { OrderPlaced } from '../../models/orderPlaced';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-card',
  imports: [CommonModule],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css',
})
export class OrderCardComponent {
  placedOrder: InputSignal<OrderPlaced> = input.required<OrderPlaced>();
}
