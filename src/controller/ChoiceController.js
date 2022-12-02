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
