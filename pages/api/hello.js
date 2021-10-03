// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;

  const movies = await client
    .db("taikonotes")
    .collection("songs")
    .find({})
    .toArray();
  res.json(movies);
}
