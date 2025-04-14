import { Component, inject, OnInit } from '@angular/core';
import { ProductCategory } from '../../models/productCategory';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'side-bar',
  imports: [],
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
}
