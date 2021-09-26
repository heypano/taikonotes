import React, { memo, useCallback, useState } from "react";
import * as PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setIntensity, useCell, useSoundObj } from "../redux/mainSlice";
import PopupMenu from "./PopupMenu";
import { onEnter } from "../keyboard/util";

const Cell = (props) => {
  const { cellIndex, sectionIndex, isPlaying, isStartingCell } = props;
  const dispatch = useDispatch();
  const soundObj = useSoundObj();
  const [showMenu, setShowMenu] = useState(false);
  const [menuCoordinates, setMenuCoordinates] = useState();
  const onOpenChange = useCallback((v) => {
    setShowMenu(v);
  }, []);

  let backgroundClass;
  const { sound: currentSound = 0, intensity } = useCell(
    sectionIndex,
    cellIndex
  );
  const sound = (currentSound && soundObj[currentSound]) || "";
  if (isPlaying) {
    backgroundClass = "bg-red-300 hover:bg-red-600";
  } else if (isStartingCell) {
    backgroundClass = "bg-gray-300 hover:bg-blue-400";
  } else {
    backgroundClass = "hover:bg-blue-400";
  }

  console.debug(`Cell rerender ${cellIndex}`);
  const onClick = (e) => {
    setShowMenu(!showMenu);
    if (e.clientX && e.clientY) {
      setMenuCoordinates([e.clientX, e.clientY]);
    } else if (e.target) {
      const { x, y } = e.target.getBoundingClientRect();
      setMenuCoordinates([x, y]);
    }
    e.preventDefault();
  };

  return (
    <div
      className={`fadeBg flex flex-row justify-center items-center select-none border border-blue-800 h-10 cursor-pointer ${backgroundClass}`}
      role="button"
      tabIndex={0}
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
      onClick={onClick}
      onKeyPress={onEnter(onClick)}
    >
      {intensity ? sound.toLocaleUpperCase() : sound}
      <PopupMenu
        open={showMenu}
        menuCoordinates={menuCoordinates}
        onOpenChange={onOpenChange}
        cellIndex={cellIndex}
        sectionIndex={sectionIndex}
      />
    </div>
  );
};

Cell.propTypes = {
  isStartingCell: PropTypes.bool.isRequired,
  cellIndex: PropTypes.number.isRequired,
  sectionIndex: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool,
};

Cell.defaultProps = {
  isPlaying: undefined,
};

export default memo(Cell);
