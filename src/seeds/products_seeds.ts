import { faker } from '@faker-js/faker';
import { Product } from './types.js';

function generateFakeProduct(): Product {
  const name = faker.commerce.productName();
  const price = faker.number.int({ min: 299, max: 500000 });
  const description = faker.lorem.sentences({ min: 3, max: 10 });
  const category = faker.commerce.department();
  const brand = faker.company.name();
  const imageUrl = faker.image.urlLoremFlickr({ width: 128, height: 128, category });

  return {
    id: faker.string.uuid(),
    name,
    price,
    description,
    category,
    brand,
    imageUrl,
  };
}

function generateProducts(numProducts: number): Product[] {
  const products: Product[] = [];

  for (let i = 1; i <= numProducts; i++) {
    const product = generateFakeProduct();
    products.push(product);
  }

  return products;
}

export default generateProducts;