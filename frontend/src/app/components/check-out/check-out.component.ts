import { Component, inject, OnInit } from '@angular/core';
import { CheckOutService } from '../../services/check-out.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ParseProductId } from '../../helpers/parseProductId';

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
  STATES_ABBREVIATIONS: string[] = [
    'AL',
    'AK',
    'AS',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'DC',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PW',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY',
  ];

  ngOnInit(): void {
    this.checkoutService.order()?.orderItems?.forEach((item) =>
      this.productService
        .getProductDetail((item.productId ?? '').toString())
        .subscribe({
          next: (product) => {
            this.products.push(product);
            product.productId = ParseProductId(product._links.self.href);
          },
        })
    );
  }

  getProduct(id: number): Product | undefined {
    return this.products.find((product) => product.productId === id);
  }

  calculateCartTotal(): number | undefined {
    return this.checkoutService
      .order()
      ?.orderItems?.reduce(
        (total, item) => total + (item.price ?? 0) * item.quantity,
        0
      );
  }
}
