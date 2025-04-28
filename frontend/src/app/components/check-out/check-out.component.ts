import { Component, inject } from '@angular/core';
import { CheckOutService } from '../../services/check-out.service';

@Component({
  selector: 'app-check-out',
  imports: [],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent {
  checkoutService = inject(CheckOutService);
}
