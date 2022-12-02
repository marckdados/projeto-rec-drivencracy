import db from "../database/db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";
export async function ChoiceValidate(req, res, next) {
  const choice = req.body;
  const dateNow = dayjs();

  if (!choice.pollId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.sendStatus(404);
  }

  if (!choice.title) {
    return res.sendStatus(422);
  }
  if (!choice.pollId) {
    return res.sendStatus(404);
  }

  try {
    const existsTitle = await db
      .collection("choice")
      .findOne({ title: choice.title });
    if (existsTitle) {
      return res.sendStatus(409);
    }

    const existsPoll = await db
      .collection("polls")
      .findOne({ _id: ObjectId(choice.pollId) });
    if (!existsPoll) {
      return res.sendStatus(404);
    }

    const datePoll = existsPoll.expireAt;

    if (dateNow.isAfter(datePoll)) {
      return res.sendStatus(403);
    }
    res.locals.choices = choice;
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  next();
}
