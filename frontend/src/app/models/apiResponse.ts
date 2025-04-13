import { Product } from './product';

type Page = {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

type Links = {
  product: { href: string };
  self: { href: string };
  category: { href: string };
};

export type ApiResponse = {
  _embedded: { products: Product[] };
  page: Page;
  _links: Links;
};
