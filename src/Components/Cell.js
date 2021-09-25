import React, { memo } from "react";
import * as PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setSoundIndex } from "../redux/mainSlice";

const Cell = (props) => {
  const {
    soundArray = [],
    cellIndex,
    sectionIndex,
    soundIndex,
    isPlaying,
    isStartingCell,
  } = props;
  const dispatch = useDispatch();
  let backgroundClass;
  const sound = soundArray[soundIndex];
  if (isPlaying) {
    backgroundClass = "bg-red-300 hover:bg-red-600";
  } else if (isStartingCell) {
    backgroundClass = "bg-gray-300 hover:bg-blue-400";
  } else {
    backgroundClass = "hover:bg-blue-400";
  }
  console.debug(`Cell rerender ${cellIndex}`);
  return (
    <div
      className={`flex flex-row justify-center items-center select-none border border-blue-800 h-10 cursor-pointer ${backgroundClass}`}
      onClick={() => {
        const nextSoundsIndex = (soundIndex + 1) % soundArray.length;
        dispatch(
          setSoundIndex({
            cellIndex,
            sectionIndex,
            soundIndex: nextSoundsIndex,
          })
        );
      }}
      onContextMenu={() => {
        dispatch(
          setSoundIndex({
            cellIndex,
            sectionIndex,
            soundIndex: 0,
          })
        );
      }}
    >
      {sound}
    </div>
  );
};

Cell.propTypes = {
  isStartingCell: PropTypes.bool.isRequired,
  soundArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  soundIndex: PropTypes.number.isRequired,
  cellIndex: PropTypes.number.isRequired,
  sectionIndex: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool,
};

Cell.defaultProps = {
  isPlaying: undefined,
};

export default memo(Cell);
