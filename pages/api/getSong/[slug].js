// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;

  const { slug } = req.query;

  const song = await client.db("taikonotes").collection("songs").findOne({
    slug,
  });
  if (song) {
    res.json(song);
  } else {
    res.status(400).json({ error: `Song ${slug} not found` });
  }
}
