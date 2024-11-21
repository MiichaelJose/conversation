type Product = {
  price?: number;
  title?: string;
  quantity?: number;
};

type Customer = {
  custumerId: number;
  email: string;
  name: string;
  phone: {
    phoneNumber: string;
    masked: string;
    numbersOnly: string;
  };
  document: {
    number: string;
    type: string;
  };
  address: {
    zipcode: string;
    street: string;
    streetNumber: string;
    neighborhood: string;
    complement?: string;
    city: string;
    state: string;
  };
};

type Order = {
  message: string | number | readonly string[] | undefined;
  id?: number;
  uuid?: string;
  externalId?: string;
  projectId?: number;
  userParticipantId?: number;

  status?: string;
  value?: number;

  paymentMethod?: string;
  customerContactStatus?: "not_contacted" | "awaiting_contact" | "in_contact";

  products?: Product[];
  customer: Customer;

  orderCreatedAt?: string;
  orderPaidAt?: string;
  updatedAt?: string;
  createdAt?: string;
};

export type GetFilterOrders = {
  orders: Order[];
  totalPages: number;
  total: number;
};

export type OrderResponse = Order[];
