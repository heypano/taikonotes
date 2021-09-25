import React from "react";
import * as PropTypes from "prop-types";

const Cell = (props) => {
  const { sound, onClick, onContextMenu, isPlaying, isStartingCell } = props;
  let backgroundClass;
  if (isPlaying) {
    backgroundClass = "bg-red-300 hover:bg-red-600";
  } else if (isStartingCell) {
    backgroundClass = "bg-gray-300 hover:bg-blue-400";
  } else {
    backgroundClass = "hover:bg-blue-400";
  }
  console.debug("Cell rerendering");

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
  isPlaying: PropTypes.bool,
};

Cell.defaultProps = {
  isStartingCell: undefined,
  sound: undefined,
  onClick: undefined,
  onContextMenu: undefined,
  isPlaying: undefined,
};

export default Cell;
