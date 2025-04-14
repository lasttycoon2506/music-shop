import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-list',
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  productService = inject(ProductService);
  private router = inject(ActivatedRoute);

  ngOnInit(): void {
    if (this.router.snapshot.paramMap.has('id')) {
      const categoryId: string = this.router.snapshot.paramMap.get('id')!;
      this.searchByCategoryId(categoryId);
    }
  }

  searchByCategoryId(id: string) {
    this.productService;
  }
  loadProducts() {
    this.productService.getProducts();
  }
}
