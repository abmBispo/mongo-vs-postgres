import { MongoClient } from "mongodb";
const uri = "mongodb://root:qwe@localhost:27017/?authMechanism=DEFAULT";
const mongo = new MongoClient(uri);

export default mongo;
