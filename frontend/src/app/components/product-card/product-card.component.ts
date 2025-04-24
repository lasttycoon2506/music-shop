import { Component, inject, input } from '@angular/core';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CheckOutService } from '../../services/check-out.service';

@Component({
  selector: 'product-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private checkoutService = inject(CheckOutService);
  product = input.required<Product>();
  private quantity: number = 0;

  addItem() {
    this.checkoutService.order.set({
      orderItems: [
        {
          imageUrl: this.product().imageUrl,
          price: this.product().price,
          quantity: this.quantity + 1,
          productId: parseInt(this.parseId(this.product()._links.self.href)),
        },
      ],
    });
  }

  parseId(url: string): string {
    const productId = url.match(/\d+$/)![0];
    return productId;
  }
}
