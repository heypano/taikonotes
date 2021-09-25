import React, { memo, useCallback, useState } from "react";
import * as PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setIntensity, setSoundIndex, useCell } from "../redux/mainSlice";
import PopupMenu from "./PopupMenu";

const Cell = (props) => {
  const {
    soundArray = [],
    cellIndex,
    sectionIndex,
    isPlaying,
    isStartingCell,
  } = props;
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [menuCoordinates, setMenuCoordinates] = useState();
  const onOpenChange = useCallback((v) => {
    setShowMenu(v);
  }, []);

  let backgroundClass;
  const { soundIndex: currentSoundIndex = 0, intensity } = useCell(
    sectionIndex,
    cellIndex
  );
  const sound = soundArray[currentSoundIndex] || "";
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
      className={`fadeBg flex flex-row justify-center items-center select-none border border-blue-800 h-10 cursor-pointer ${backgroundClass}`}
      onContextMenu={(e) => {
        dispatch(
          setIntensity({
            cellIndex,
            sectionIndex,
            intensity: intensity ? 0 : 1,
          })
        );
        e.preventDefault();
      }}
      onClick={(e) => {
        setShowMenu(true);
        setMenuCoordinates([e.clientX, e.clientY]);
        e.preventDefault();
      }}
    >
      {intensity ? sound.toLocaleUpperCase() : sound}
      <PopupMenu
        open={showMenu}
        menuCoordinates={menuCoordinates}
        onOpenChange={onOpenChange}
        cellIndex={cellIndex}
        sectionIndex={sectionIndex}
        soundArray={soundArray}
      />
    </div>
  );
};

Cell.propTypes = {
  isStartingCell: PropTypes.bool.isRequired,
  soundArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  cellIndex: PropTypes.number.isRequired,
  sectionIndex: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool,
};

Cell.defaultProps = {
  isPlaying: undefined,
};

export default memo(Cell);
