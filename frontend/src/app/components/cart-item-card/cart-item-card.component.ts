import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { CheckOutService } from '../../services/check-out.service';

@Component({
  selector: 'cart-item-card',
  imports: [CommonModule],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.css',
})
export class CartItemCardComponent implements OnInit {
  private productService: ProductService = inject(ProductService);
  private checkoutService: CheckOutService = inject(CheckOutService);
  item: InputSignal<OrderItem> = input.required<OrderItem>();
  product: Product | null = null;

  ngOnInit(): void {
    this.productService
      .getProductDetail(this.item().productId!.toString())
      .subscribe({
        next: (product: Product) => (this.product = product),
      });
  }

  calculateItemTotal(): number {
    return this.item().quantity * this.item().price!;
  }

  setNewItemQuantity(event: Event, item: OrderItem): void {
    const newQuantity: number = parseInt(
      (event.target as HTMLInputElement).value
    );

    if (newQuantity < 0) {
      return;
    }

    if (newQuantity === 0) {
      this.checkoutService.order.update((currentOrder) => {
        return {
          ...currentOrder,
          order: {
            ...currentOrder?.order,
            totalQuantity:
              currentOrder!.order!.totalQuantity -
              (item.quantity - newQuantity),
          },
          orderItems: currentOrder!.orderItems!.filter(
            (orderItem) => orderItem.productId !== item.productId
          ),
        };
      });
    } else {
      this.checkoutService.order.update((currentOrder) => {
        return {
          ...currentOrder,
          order: {
            ...currentOrder?.order,
            totalQuantity:
              currentOrder!.order!.totalQuantity -
              (item.quantity - newQuantity),
          },
          orderItems: currentOrder!.orderItems!.map((orderItem) =>
            orderItem.productId === item.productId
              ? { ...orderItem, quantity: newQuantity }
              : orderItem
          ),
        };
      });
    }
  }
}
