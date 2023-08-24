import mongo from "./clients/mongo.js";
import * as benchmark from "benchmark";

const suite = new benchmark.Suite();
const db = mongo.db("document_db");

suite
  .add("Mongo#TotalAmountGreaterThan", function () {
    db.collection("orders").find({ totalAmount: { $gt: 15000_00 } });
  })
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + (this)?.filter("fastest").map("name"));
  })
  .run({ async: true });

// mongo.close();
