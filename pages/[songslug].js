import { memo } from "react";
import PropTypes from "prop-types";
import App from "../components/App";
import clientPromise from "../lib/mongodb";
import { getSongBySlug, transformFromMongo } from "../lib/mongoUtil";

function SongPage({ song, error }) {
  return <App song={song} error={error} />
}

SongPage.propTypes = {
  song: PropTypes.shape({}),
  error: PropTypes.string,
};
SongPage.defaultProps = {
  song: undefined,
  error: undefined,
};

export const getServerSideProps = async ({ params, res }) => {
  const { songslug } = params;
  let client;
  let song;
  let error = null;
  try {
    client = await clientPromise;
    song = await getSongBySlug(client, songslug);
  } catch (e) {
    error = e.toString();
  }
  return { props: { song: transformFromMongo(song), error } };
};

export default memo(SongPage);
