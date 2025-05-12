type OrderPlaced = {
  trackingNumber: string;
  totalQuantity: number;
  totalPrice: number;
  status: string;
  dateCreated: string;
  lastUpdated: string;
  orderItems: OrderItem[];
  _links: {
    customer: {
      href: string;
    };
  };
};
