import { Address } from './order';
import { OrderItem } from './orderItem';

export type PurchaseDto = {
  customer: { firstName: string; lastName: string; email: string };
  shippingAddress?: Address;
  billingAddress?: Address;
  order?: {
    totalQuantity: number;
    totalPrice?: number;
    status?: string;
  };
  orderItems?: OrderItem[];
};
