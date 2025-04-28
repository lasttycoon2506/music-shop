import { Component, inject, OnInit } from '@angular/core';
import { CheckOutService } from '../../services/check-out.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-check-out',
  imports: [CommonModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent implements OnInit {
  private productService = inject(ProductService);
  checkoutService = inject(CheckOutService);
  products: Product[] = [];

  ngOnInit(): void {
    this.checkoutService.order()?.orderItems?.forEach((item) =>
      this.productService
        .getProductDetail(item.productId.toString())
        .subscribe({
          next: (product) => {
            this.products.push(product);
            product.productId = Number(this.parseId(product._links.self.href));
          },
        })
    );
  }

  parseId(url: string): string {
    const productId = url.match(/\d+$/)![0];
    return productId;
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((product) => product.productId === id);
  }

  calculateCartTotal(): number | undefined {
    return this.checkoutService
      .order()
      ?.orderItems?.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
  }
}
