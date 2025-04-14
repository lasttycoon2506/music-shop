import { ProductCategory } from './productCategory';

type Page = {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

type Links = {
  profile: { href: string };
  self: { href: string };
};

export type ProductsCategoriesApiResponse = {
  _embedded: { productCategories: ProductCategory[] };
  page: Page;
  _links: Links;
};
