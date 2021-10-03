// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;

  try {
    const insert = await client
      .db("taikonotes")
      .collection("songs")
      .insertOne(JSON.parse(req.body));

    if (insert) {
      res.json(insert);
    } else {
      res.json({
        success: true,
      });
    }
  } catch (e) {
    res.status(200).json({ error: e.toString() });
  }
}
