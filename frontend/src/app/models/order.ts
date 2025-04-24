import { OrderItems } from './orderItems';

export type Order = {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  shippingAddress: Address;
  billingAddress: Address;
  order: {
    totalQuantity: number;
    totalPrice: number;
    status: string;
  };
  orderItems: [OrderItems];
};

type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
};
