import mongo from "./mongo.js";
import scalarMongo from "./benchmarks/mongo/scalars.js";

try {
  console.log();
  await scalarMongo(mongo);
} finally {
  await mongo.close();
}
