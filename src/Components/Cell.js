import React from "react";
import * as PropTypes from "prop-types";

const Cell = (props) => {
  let { sound, onClick, onContextMenu, isPlaying, isStartingCell } = props;
  let backgroundClass;
  if (isPlaying) {
    backgroundClass = "bg-red-300 hover:bg-red-600";
  } else if (isStartingCell) {
    backgroundClass = "bg-gray-300 hover:bg-blue-400";
  } else {
    backgroundClass = "hover:bg-blue-400";
  }

  return (
    <div
      className={`flex flex-row justify-center items-center select-none border border-blue-800 h-10 cursor-pointer ${backgroundClass}`}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {sound}
    </div>
  );
};

Cell.propTypes = {
  isStartingCell: PropTypes.bool,
  sound: PropTypes.node,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
};

export default Cell;
