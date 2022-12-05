import { Router } from "express";
import {
  createrPoll,
  findPoll,
  getPoll,
  showResult,
} from "../controller/PollController.js";
import {
  PollValidate,
  PollVerify,
  ResultValidate,
} from "../middlewares/PollValidateMiddleware.js";

const PollRouter = Router();

PollRouter.post("/poll", PollValidate, createrPoll);
PollRouter.get("/poll/:id/choice", PollVerify, findPoll);
PollRouter.get("/poll", getPoll);
PollRouter.get("/poll/:id/result", ResultValidate, showResult);

export default PollRouter;
