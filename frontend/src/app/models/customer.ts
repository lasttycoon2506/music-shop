import { OrderPlaced } from './orderPlaced';

export type Customer = {
  firstName: string;
  lastName: string;
  email?: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  orders?: OrderPlaced[];
  _links?: {
    self: {
      href: string;
    };
    customer: {
      href: string;
    };
  };
};

export type Address = {
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
