import { Component, inject, OnInit } from '@angular/core';
import { CheckOutService } from '../../services/check-out.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-check-out',
  imports: [],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css',
})
export class CheckOutComponent implements OnInit {
  checkoutService = inject(CheckOutService);
  productService = inject(ProductService);
  products: Product[] = [];

  ngOnInit(): void {
    this.checkoutService
      .order()
      ?.orderItems?.forEach((item) =>
        this.productService
          .getProductDetail(item.productId.toString())
          .subscribe({ next: (product) => this.products.push(product) })
      );
  }
}
