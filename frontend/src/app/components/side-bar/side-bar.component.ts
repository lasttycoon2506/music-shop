import { Component, inject, OnInit } from '@angular/core';
import { ProductCategory } from '../../models/productCategory';
import { ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'side-bar',
  imports: [RouterLink],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit {
  private productService = inject(ProductService);
  productCategories: ProductCategory[] = [];

  ngOnInit(): void {
    this.loadProductCategories();
  }

  loadProductCategories(): void {
    this.productService.getProductCategories().subscribe({
      next: (data) => {
        this.productCategories = data;
      },
    });
  }

  parseId(url: string): string {
    const productId = url.match(/\d+$/)![0];
    return productId;
  }

  capitalizeFirstLetter(category: string) {
    return (
      String(category).charAt(0).toUpperCase() + category.toLowerCase().slice(1)
    );
  }
}
