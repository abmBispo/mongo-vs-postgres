import { faker } from "@faker-js/faker";
import { Customer, Order, Product } from "./types.js";

export default function generateOrder(
  products: Product[],
  customer: Customer
): Order {
  const shippingAddress = customer.address;
  const orderDate = faker.date.past();

  return {
    id: faker.string.uuid(),
    customer: customer,
    totalAmount: products.reduce((sum, product) => product.price + sum, 0),
    orderDate,
    shippingAddress,
    products,
  };
}
