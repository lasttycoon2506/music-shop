import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { CheckOutService } from '../../services/check-out.service';
import { OrderItem } from '../../models/orderItem';
import { ParseProductId } from '../../helpers/parseProductId';
import { OktaService } from '../../services/okta.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  private router = inject(ActivatedRoute);
  private checkoutService = inject(CheckOutService);
  oktaService = inject(OktaService);
  product!: Product;
  item: OrderItem | null = null;

  ngOnInit(): void {
    this.router.data.subscribe({
      next: (data) => {
        this.product = data['product'];
      },
    });

    this.product.productId = ParseProductId(this.product._links.self.href);

    const existingOrderItem = this.checkoutService
      .order()
      ?.orderItems?.find((item) => item.productId === this.product.productId);

    if (existingOrderItem) {
      this.item = existingOrderItem;
    } else {
      this.item = { quantity: 0 };
    }
  }

  setNewItemQuantity(event: Event) {
    const newQuantity = parseInt((event.target as HTMLInputElement).value);
    const currentOrder = this.checkoutService.order();

    if (currentOrder) {
      this.checkoutService.order.update((currentOrder) => {
        return {
          ...currentOrder,
          order: {
            ...currentOrder!.order,
            totalQuantity:
              currentOrder!.order!.totalQuantity -
              (currentOrder?.orderItems?.find(
                (orderItem) => orderItem.productId === this.item?.productId
              )?.quantity! -
                newQuantity),
          },
          orderItems: currentOrder?.orderItems?.map((orderItem) =>
            orderItem.productId === this.item!.productId
              ? { ...orderItem, quantity: newQuantity }
              : orderItem
          ),
        };
      });
    }
  }
}
