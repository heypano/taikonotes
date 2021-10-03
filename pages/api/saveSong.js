// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;

  const insert = await client
    .db("taikonotes")
    .collection("songs")
    .insertOne(JSON.parse(req.body));
  res.json(insert);
}
