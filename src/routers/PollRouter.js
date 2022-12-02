import { Router } from "express";
import {
  createrPoll,
  findPoll,
  getPoll,
} from "../controller/PollController.js";
import {
  PollValidate,
  PollVerify,
} from "../middlewares/PollValidateMiddleware.js";

const PollRouter = Router();

PollRouter.post("/poll", PollValidate, createrPoll);
PollRouter.get("/poll/:id/choice", PollVerify, findPoll);
PollRouter.get("/poll", getPoll);

export default PollRouter;
