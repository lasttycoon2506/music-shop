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
  _embedded: { productCategory: ProductCategory[] };
  page: Page;
  _links: Links;
};
