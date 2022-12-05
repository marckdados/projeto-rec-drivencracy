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

export async function showResult(req, res) {
  const pollId = res.locals.id;
  try {
    const options = await db.collection("choices").find({ pollId }).toArray();
    const votes = await db.collection("votes").find().toArray();
    let filtrados = [];
    const results = [];

    options.forEach((option) => {
      filtrados = votes.filter((vote) => {
        return vote.choiceId.toString() === option._id.toString();
      });

      let soma = 0;
      for (let i = 0; i < filtrados.length; i++) {
        soma++;
      }
      console.log(soma);
      const obj = { title: option.title, votes: soma };
      results.push(obj);
    });
    console.log(results);
    let result = {};
    let votos = 0;

    results.forEach((resu) => {
      if (resu.votes > votos) {
        votos = resu.votes;
        result = resu;
      }
    });
    const poll = await db
      .collection("polls")
      .findOne({ _id: ObjectId(pollId) });

    res.status(200).send({ ...poll, result });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
