import dayjs from "dayjs";
import db from "../database/db.js";

export async function createChoice(req, res) {
  const choice = res.locals.choices;

  try {
    await db.collection("choices").insertOne(choice);
    res.status(201).send(choice);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function createVote(req, res) {
  const choiceId = res.locals.choiceId;
  const createdAt = dayjs().format("YYYY-MM-DD HH:mm");
  console.log(createdAt);
  try {
    await db.collection("votes").insertOne({ choiceId, createdAt });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
