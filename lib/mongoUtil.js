import { checkPassword, generateHash } from "./salt";

/**
 * Update old format songs
 * @param obj
 */
const updateFormat = (obj) => {
  const { sections, sectionsMap } = obj;
  // If sections map is missing, create it
  if (sections && !sectionsMap) {
    const map = {};
    sections.forEach((section, index) => {
      map[section.id] = section;
    });
    return {
      ...obj,
      sectionsMap: map,
      sections: Object.keys(map),
    };
  }
  return obj;
};

export const getSongBySlug = async (client, slug, includePassword) => {
  const song = await client.db("taikonotes").collection("songs").findOne({
    slug,
  });
  if (!song) {
    throw new Error(`Song ${slug} not found`);
  }
  if (!includePassword) {
    delete song.password;
  }

  return updateFormat(song);
};

export const saveSongBySlug = async (client, slug, stringifiedData) => {
  const json = JSON.parse(stringifiedData);
  const { isNew, password: givenPassword } = json;
  let existingSong;

  try {
    existingSong = await getSongBySlug(client, slug, true);
  } catch {
    // Song doesn't exist with this slug -- create it
  }

  if (existingSong) {
    if (isNew) {
      throw new Error(`A song already exists at /${slug}`);
    }
    const { password: existingPasswordHash } = existingSong;
    // throws error if incorrect password
    await checkPassword(givenPassword, existingPasswordHash);
  }

  const saltedPassword = await generateHash(givenPassword);
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
