import { Router } from "express";
import { createChoice, createVote } from "../controller/ChoiceController.js";
import {
  ChoiceValidate,
  VoteValidate,
} from "../middlewares/ChoiceValidateMiddleware.js";

const choiceRouter = Router();

choiceRouter.post("/choice", ChoiceValidate, createChoice);
choiceRouter.post("/choice/:id/vote", VoteValidate, createVote);

export default choiceRouter;
