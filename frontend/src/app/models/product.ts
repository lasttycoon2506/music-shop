export type Product = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  productId?: number;
  _links: {
    self: { href: string };
    product: { href: string };
    category: { href: string };
  };
};
