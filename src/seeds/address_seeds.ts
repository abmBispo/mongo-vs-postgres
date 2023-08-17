import { faker } from "@faker-js/faker";
import { Address } from "./types.js";

export default function generateAddress(): Address {
  return {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
  };
}
