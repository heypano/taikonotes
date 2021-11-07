import { generateHash } from "./salt";

export const getSongBySlug = async (client, slug) => {
  const song = await client.db("taikonotes").collection("songs").findOne({
    slug,
  });
  if (!song) {
    throw new Error(`Song ${slug} not found`);
  }
  delete song.password;
  return song;
};

export const saveSongBySlug = async (client, slug, stringifiedData) => {
  const json = JSON.parse(stringifiedData);
  const { password } = json;
  const saltedPassword = await generateHash(password);
  json.password = saltedPassword;
  return client
    .db("taikonotes")
    .collection("songs")
    .replaceOne({ slug }, json, { upsert: true });
};

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
