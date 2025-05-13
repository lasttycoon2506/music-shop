import { Address } from './customer';
import { OrderItem } from './orderItem';

export type PurchaseDto = {
  customer: { firstName: string; lastName: string; email: string };
  billingAddress: Address;
  shippingAddress: Address;
  order: {
    totalQuantity: number;
    totalPrice: number;
    status: string;
  };
  orderItems: OrderItem[];
};
