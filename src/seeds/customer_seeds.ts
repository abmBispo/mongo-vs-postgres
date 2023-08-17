import { faker } from "@faker-js/faker";
import { Customer } from "./types.js";
import generateAddress from "./address_seeds.js";

export default function generateCustomers(numCustomers: number): Customer[] {
  const customers: Customer[] = [];

  for (let i = 1; i <= numCustomers; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email().toLowerCase();
    const phone = faker.phone.number();
    const address = generateAddress();

    const customer = {
      id: faker.string.uuid(),
      firstName,
      lastName,
      email,
      phone,
      address,
    };

    customers.push(customer);
  }

  return customers;
}
