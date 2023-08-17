import mongo from "./clients/mongo.js";
import scalarMongo from "./benchmarks/mongo/scalars.js";

try {
  console.log("teste");
  scalarMongo(mongo);
} finally {
  mongo.close();
}
