import { Component, inject } from '@angular/core';
import { OrderCardComponent } from '../order-card/order-card.component';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-orders',
  imports: [OrderCardComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  customerService: CustomerService = inject(CustomerService);
}
