import pollSchema from "../schema/PollSchema.js";
import dayjs from "dayjs";
import db from "../database/db.js";
import { ObjectId } from "mongodb";

export function PollValidate(req, res, next) {
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

export async function PollVerify(req, res, next) {
  const pollId = req.params.id;
  if (!pollId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.sendStatus(404);
  }
  try {
    const pollExists = await db
      .collection("choices")
      .find({ pollId: pollId })
      .toArray();
    console.log(pollExists);
    if (!pollExists || pollExists.length === 0) {
      return res.sendStatus(404);
    }
    res.locals.pollIds = pollId;
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  next();
}
