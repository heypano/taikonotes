export const getSongBySlug = async (client, slug) => {
  const song = await client.db("taikonotes").collection("songs").findOne({
    slug,
  });
  if (!song) {
    throw new Error(`Song ${slug} not found`);
  }
  return song;
};

export const saveSongBySlug = async (client, slug, stringifiedData) =>
  client
    .db("taikonotes")
    .collection("songs")
    .replaceOne({ slug }, JSON.parse(stringifiedData), { upsert: true });

/**
 * Transform the object as it is received from mongodb so that it can be serialized
 */
export const transformFromMongo = (obj) => {
  if (!obj) return null;
  const result = { ...obj };
  // eslint-disable-next-line no-underscore-dangle
  delete result._id;
  return result;
};