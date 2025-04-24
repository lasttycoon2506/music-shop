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
  orderItems: [
    {
      imageUrl: string;
      price: number;
      quantity: number;
      productId: number;
    }
  ];
};

type Address = {
  street: string;
  city: string;
  state: string;
  zip: string;
};
