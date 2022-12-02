import { Router } from "express";
import choiceRouter from "./ChoiceRouter.js";
import PollRouter from "./PollRouter.js";

const routers = Router();

routers.use(PollRouter);
routers.use(choiceRouter);

export default routers;
