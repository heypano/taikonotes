import React from "react";
import PropTypes from "prop-types";

const VideoPlayer = ({ videoId, height, width }) => {
  const url = `https://www.youtube.com/embed/${videoId}`;
  return (
    <iframe
      type="text/html"
      width="320"
      height="180"
      src={url}
      title="youtube video"
      frameBorder="0"
    />
  );
};

VideoPlayer.propTypes = {
  videoId: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

VideoPlayer.defaultProps = {
  videoId: undefined,
  width: "",
  height: "",
};

export default VideoPlayer;
