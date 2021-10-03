import { memo } from "react";
import PropTypes from "prop-types";
import App from "../components/App";
import clientPromise from "../lib/mongodb";
import { getSongBySlug, transformFromMongo } from "../lib/mongoUtil";

const Song = ({ song }) => <App song={song} />;
Song.propTypes = {
  song: PropTypes.shape({}),
};
Song.defaultProps = {
  song: undefined,
};

export const getServerSideProps = async ({ params, res }) => {
  const { songslug } = params;
  const client = await clientPromise;
  const song = await getSongBySlug(client, songslug);
  return { props: { song: transformFromMongo(song) } };
};

export default memo(Song);
