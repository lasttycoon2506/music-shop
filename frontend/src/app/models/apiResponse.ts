import { Product } from './product';

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

export type ApiResponse = {
  _embedded: { products: Product[] };
  page: Page;
  _links: Links;
};
