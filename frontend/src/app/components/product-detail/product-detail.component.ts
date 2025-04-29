import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { CheckOutService } from '../../services/check-out.service';
import { OrderItem } from '../../models/orderItem';
import { parse } from 'path';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  private router = inject(ActivatedRoute);
  private checkoutService = inject(CheckOutService);
  product!: Product;
  item?: OrderItem;

  ngOnInit(): void {
    this.router.data.subscribe({
      next: (data) => {
        this.product = data['product'];
      },
    });

    this.product.productId = Number(
      this.parseId(this.product._links.self.href)
    );

    this.item = this.checkoutService
      .order()
      ?.orderItems?.find((item) => item.productId === this.product.productId);
  }

  parseId(url: string): string {
    const productId = url.match(/\d+$/)![0];
    return productId;
  }
}
