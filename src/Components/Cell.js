import React, { useState } from "react";
import * as PropTypes from "prop-types";

const Cell = (props) => {
  const [selectedSoundIndex, setSelectedSoundIndex] = useState(0);

  let { index, divideEvery, sounds, isPlaying } = props;
  let backgroundClass;
  if (isPlaying) {
    backgroundClass = "bg-red-300 hover:bg-red-600";
  } else if (index % divideEvery === 0) {
    backgroundClass = "bg-gray-300 hover:bg-blue-400";
  } else {
    backgroundClass = "hover:bg-blue-400";
  }

  return (
    <div
      className={`flex flex-row justify-center items-center select-none border border-blue-800 h-10 cursor-pointer ${backgroundClass}`}
      onClick={() => {
        const nextSoundsIndex = (selectedSoundIndex + 1) % sounds.length;
        setSelectedSoundIndex(nextSoundsIndex);
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setSelectedSoundIndex(null);
      }}
    >
      {sounds[selectedSoundIndex]}
    </div>
  );
};

Cell.propTypes = {
  index: PropTypes.any,
  divideEvery: PropTypes.any,
  cellsPerLine: PropTypes.any,
  sounds: PropTypes.any,
};

export default Cell;
