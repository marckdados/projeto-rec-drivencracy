import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routers from "./routers/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(routers);

app.listen(process.env.PORT, () => {
  console.log(`Conectado na porta ${process.env.PORT}}`);
});
