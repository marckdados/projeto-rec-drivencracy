import db from "../database/db.js";
import { ObjectId } from "mongodb";

const pollCollection = db.collection("polls");
export async function createrPoll(req, res) {
  const poll = res.locals.polls;

  console.log(poll);
  try {
    await pollCollection.insertOne(poll);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function getPoll(req, res) {
  try {
    const polls = await pollCollection.find().toArray();
    res.send(polls);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function findPoll(req, res) {
  const pollId = res.locals.pollIds;

  try {
    const existsPoll = await db
      .collection("choices")
      .find({ pollId: pollId })
      .toArray();
    console.log(existsPoll);
    res.status(200).send(existsPoll);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
