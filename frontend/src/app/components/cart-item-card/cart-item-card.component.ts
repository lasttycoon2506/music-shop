import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { OrderItem } from '../../models/orderItem';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cart-item-card',
  imports: [CommonModule],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.css',
})
export class CartItemCardComponent implements OnInit {
  private productService = inject(ProductService);
  item: InputSignal<OrderItem> = input.required<OrderItem>();
  product: Product | null = null;

  ngOnInit(): void {
    this.productService
      .getProductDetail(this.item().productId.toString())
      .subscribe({
        next: (product: Product) => (this.product = product),
      });
  }

  calculateItemTotal(): number {
    return this.item().quantity * this.item().price;
  }
}
