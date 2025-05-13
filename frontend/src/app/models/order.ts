import { OrderItem } from './orderItem';

export type Order = {
  order?: {
    totalQuantity: number;
    totalPrice?: number;
    status?: string;
  };
  orderItems?: OrderItem[];
};
