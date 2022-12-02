import joi from "joi";

const pollSchema = joi.object({
  title: joi.string(),
  expireAt: joi.string(),
});

export default pollSchema;
