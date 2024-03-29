// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import clientPromise from "../../../lib/mongodb";
import { saveSongBySlug } from "../../../lib/mongoUtil";

export default async function handler(req, res) {
  const client = await clientPromise;

  const { slug } = req.query;

  try {
    const insert = await saveSongBySlug(client, slug, req.body);

    if (insert) {
      res.json(insert);
    } else {
      res.json({
        success: true,
      });
    }
  } catch (e) {
    res.status(200).json({ error: e.message });
  }
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "3mb",
    },
  },
};
