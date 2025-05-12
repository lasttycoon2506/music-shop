import { ProductCategory } from './productCategory';
import { Page } from './productsApiResponse';

export type ProductsCategoriesApiResponse = {
  _embedded: { productCategory: ProductCategory[] };
  page: Page;
  _links: ApiResLinks;
};

type ApiResLinks = {
  profile: { href: string };
  self: { href: string };
};
