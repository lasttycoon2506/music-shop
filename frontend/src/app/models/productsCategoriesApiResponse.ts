type ProductsCategoriesApiResponse = {
  _embedded: { productCategory: ProductCategory[] };
  page: Page;
  _links: ApiResLinks;
};

type ApiResLinks = {
  profile: { href: string };
  self: { href: string };
};
