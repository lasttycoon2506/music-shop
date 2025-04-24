export type Order = {
  customer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  order: {
    totalQuantity: number;
    totalPrice: number;
    status: string;
  };
  orderItems: [
    {
      imageUrl: string;
      price: number;
      quantity: number;
      productId: number;
    }
  ];
};
