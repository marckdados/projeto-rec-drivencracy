import { MongoClient } from "mongodb";

const mongoClient = new MongoClient();
await mongoClient.connect();
let db = mongoClient.db("drivencracy");

export default db;
