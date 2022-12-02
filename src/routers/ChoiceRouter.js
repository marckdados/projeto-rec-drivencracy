import { Router } from "express";
import { createChoice } from "../controller/ChoiceController.js";
import { ChoiceValidate } from "../middlewares/ChoiceValidateMiddleware.js";

const choiceRouter = Router();

choiceRouter.post("/choice", ChoiceValidate, createChoice);

export default choiceRouter;
