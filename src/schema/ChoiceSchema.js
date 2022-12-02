import joi from "joi";

const choiceSchema = joi.object({
  title: joi.string(),
  pollId: joi.string(),
});

export default choiceSchema;
