type Page = {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

type Links = {
  profile: { href: string };
  self: { href: string };
  search: { href: string };
};

type ProductsApiResponse = {
  _embedded: { products: Product[] };
  page: Page;
  _links: Links;
};
