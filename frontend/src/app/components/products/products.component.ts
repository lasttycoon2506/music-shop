import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductListComponent implements OnInit {
  productService: ProductService = inject(ProductService);
  private router: ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.router.paramMap.subscribe(() => this.loadProducts());
  }

  loadProducts(): void {
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

  searchByCategoryId(id: string): void {
    this.productService.getProductsByCategoryId(id);
  }

  searchByKeyword(keyword: string): void {
    this.productService.getProductsByKeyword(keyword);
  }

  prevPg() {
    this.productService.currentPg.set(this.productService.currentPg() - 1);
    this.loadProducts();
  }

  nextPg() {
    this.productService.currentPg.set(this.productService.currentPg() + 1);
    this.loadProducts();
  }
}
