import { Component } from '@angular/core';
import { OrderCardComponent } from '../order-card/order-card.component';

@Component({
  selector: 'app-orders',
  imports: [OrderCardComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {}
