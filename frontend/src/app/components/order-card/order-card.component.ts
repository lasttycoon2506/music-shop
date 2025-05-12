import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { OrderPlaced } from '../../models/orderPlaced';

@Component({
  selector: 'app-order-card',
  imports: [CommonModule],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css',
})
export class OrderCardComponent implements OnInit {
  private productService: ProductService = inject(ProductService);
  placedOrder: InputSignal<OrderPlaced> = input.required<OrderPlaced>();
  productDetails: { [key: number]: { name: string; description: string } } = {};

  ngOnInit(): void {
    this.loadProductDetails();
  }

  loadProductDetails() {
    this.placedOrder().orderItems.forEach((item) => {
      this.productService
        .getProductDetail(item.productId?.toString() || '')
        .subscribe({
          next: (product) => {
            if (item.productId) {
              this.productDetails[item.productId] = product;
            }
          },
        });
    });
  }
}
