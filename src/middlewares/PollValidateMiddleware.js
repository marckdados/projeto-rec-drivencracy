import pollSchema from "../schema/PollSchema.js";
import dayjs from "dayjs";

export default function PollValidate(req, res, next) {
  const poll = req.body;

  if (!poll.title) {
    return res.sendStatus(422);
  }
  const at = dayjs().set("day", 30).format("YYYY-MM-DD HH:mm");

  if (poll.expireAt === "") {
    console.log("passa aqui");
    poll.expireAt = at.toString();
  }

  const { error } = pollSchema.validate(poll, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    console.log(errors);
    return res.sendStatus(400);
  }

  res.locals.polls = poll;
  next();
}
