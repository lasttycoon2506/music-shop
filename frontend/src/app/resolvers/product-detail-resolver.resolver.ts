import { ResolveFn } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { inject } from '@angular/core';

export const productDetailResolverResolver: ResolveFn<Product | null> = (
  route
) => {
  const productService = inject(ProductService);
  productService;
};

// export const memberDetailResolver: ResolveFn<Member | null> = (route) => {
//   const memberService = inject(MemberService);

//   const username = route.paramMap.get('username');

//   if (!username) return null;

//   return memberService.getMember(username);
// };
