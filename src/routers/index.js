import { Router } from "express";
import PollRouter from "./PollRouter.js";

const routers = Router();

routers.use(PollRouter);

export default routers;
