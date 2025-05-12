import { ResolveFn } from '@angular/router';
import { ProductService } from '../services/product.service';
import { inject } from '@angular/core';
import { Product } from '../models/product';

export const productDetailResolver: ResolveFn<Product | null> = (route) => {
  const productService: ProductService = inject(ProductService);

  const id: string | null = route.paramMap.get('id');

  return productService.getProductDetail(id!);
};
