import { Order } from './order';

export type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  orders?: Order[];
  _links?: {
    self: {
      href: string;
    };
    customer: {
      href: string;
    };
  };
};

type Address = {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  _links?: {
    customer: {
      href: string;
    };
  };
};
