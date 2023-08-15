import { faker } from '@faker-js/faker';

const randomName = faker.person.fullName();
const randomEmail = faker.internet.email();

console.log(randomName);
console.log(randomEmail);
