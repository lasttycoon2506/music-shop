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
    this.router.paramMap.subscribe(() => this.loadProducts());
  }

  loadProducts() {
    if (this.router.snapshot.paramMap.has('id')) {
      const categoryId: string = this.router.snapshot.paramMap.get('id')!;
      this.searchByCategoryId(categoryId);
    } else if (this.router.snapshot.paramMap.has('name')) {
      const keyword: string = this.router.snapshot.paramMap.get('name')!;
      this.searchByKeyword(keyword);
    } else {
      this.productService.getAllProducts();
    }
  }

  searchByCategoryId(id: string) {
    this.productService.getProductsByCategoryId(id);
  }

  searchByKeyword(keyword: string) {
    this.productService.getProductsByKeyword(keyword);
  }
}
