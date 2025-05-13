import { OrderItem } from './orderItem';

export type Order = {
  shippingAddress?: Address;
  billingAddress?: Address;
  order?: {
    totalQuantity: number;
    totalPrice?: number;
    status?: string;
  };
  orderItems?: OrderItem[];
};

type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
};
