import { Router } from "express";
import { createrPoll, getPoll } from "../controller/PollController.js";
import PollValidate from "../middlewares/PollValidateMiddleware.js";

const PollRouter = Router();

PollRouter.post("/poll", PollValidate, createrPoll);
PollRouter.get("/poll", getPoll);

export default PollRouter;
