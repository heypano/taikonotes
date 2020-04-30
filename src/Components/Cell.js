import React, { useState } from "react";

/**
 * Return the next sound
 * @param {[]} sounds
 * @param {number} lastSelected
 * @returns {number}
 */
const getNextSound = (sounds, lastSelected) => {
  if (lastSelected == null) {
    return 0;
  } else if (lastSelected + 1 < sounds.length) {
    return lastSelected + 1;
  } else {
    return null;
  }
};

const Cell = ({ index, divideEvery, cellsPerLine, sounds }) => {
  const [selectedSoundIndex, setSelectedSoundIndex] = useState(null);
  const [bg, setBg] = useState(null);
  let backgroundClass = "hover:bg-gray-300";
  if (index % divideEvery === 0) {
    backgroundClass = "bg-gray-300 hover:bg-gray-600";
  }
  const styleObject = bg
    ? {
        backgroundColor: bg
      }
    : {};

  return (
    <div
      className={`flex flex-row justify-center items-center select-none border border-blue-800 h-10 cursor-pointer ${backgroundClass}`}
      style={styleObject}
      onClick={() => {
        const nextSound = getNextSound(sounds, selectedSoundIndex);
        setSelectedSoundIndex(nextSound);
      }}
      onContextMenu={e => {
        e.preventDefault();
        setSelectedSoundIndex(null);
      }}
    >
      {sounds[selectedSoundIndex]}
    </div>
  );
};

export default Cell;
