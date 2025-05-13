import { OrderItem } from './orderItem';

export type PurchaseDto = {
  customer: { firstName: string; lastName: string; email: string };
  billingAddress: PurchaseAddress;
  shippingAddress: PurchaseAddress;
  order: {
    totalQuantity: number;
    totalPrice: number;
    status: string;
  };
  orderItems: OrderItem[];
};

type PurchaseAddress = {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
};
