import generateProducts from "./products_seeds.js";
import generateCustomers from "./customer_seeds.js";
import { faker } from "@faker-js/faker";
import generateOrder from "./orders_seeds.js";
import mongo from "../clients/mongo.js";
import { Order } from "./types.js";

const seeds = async () => {
  const numOrdersToGenerate = 20_000_000;

  console.log("INFO ⚙️ - Creating products ...");
  const products = generateProducts(50_000);

  console.log("INFO ⚙️ - Creating customers ...");
  const customers = generateCustomers(1_000_000);

  console.log("INFO ⚙️ - Connecting to DB ...");
  const db = mongo.db("document_db");

  console.log("INFO ⚙️ - Creating orders collection ...");
  await db.createCollection("orders");
  console.log("OK ✅ - Orders collection created successfully");

  console.log("INFO ⚙️ - Creating orders ...");
  let ordersBatch: Order[] = [];
  for (let i = 1; i <= numOrdersToGenerate; i++) {
    const rangeShift = faker.number.int({ min: 1, max: 5 });
    const productRange = faker.number.int({ min: 1, max: 50_000 });
    const selectedProducts = products.slice(
      productRange,
      productRange + rangeShift
    );
    const customer = customers[faker.number.int({ min: 1, max: 999_999 })];

    ordersBatch.push(generateOrder(selectedProducts, customer));

    if (i % 1_000_000 == 0) {
      console.log(
        `INFO ⚙️ - Processed amount: ${(
          (i / numOrdersToGenerate) *
          100
        ).toFixed(2)}%`
      );

      await db.collection("orders").insertMany(ordersBatch);

      ordersBatch = [];
    }
  }
};

console.log("INFO ⚙️ - Wrapping up async insertion tasks ...");

seeds().then(() => {
  console.log("OK ✅ - Orders created successfully");
  mongo.close().then(() => console.log("INFO ⚙️ - Mongo connection closed."));
});
