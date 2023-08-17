export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: Address;
}

export interface Order {
  id: string;
  customer: Customer;
  totalAmount: number;
  orderDate: Date;
  shippingAddress: Address;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  brand: string;
  imageUrl: string;
}
