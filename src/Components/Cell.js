import React, { memo, useCallback, useRef, useState } from "react";
import * as PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setIntensity, useCell, useSoundObj } from "../redux/mainSlice";
import { onEnter, onSpace } from "../keyboard/util";
import CellPopupMenu from "./CellPopupMenu";

const Cell = (props) => {
  const { cellIndex, sectionIndex, isPlaying, isStartingCell } = props;
  const ref = useRef();
  const dispatch = useDispatch();
  const soundObj = useSoundObj();
  const [showMenu, setShowMenu] = useState(false);
  const [menuCoordinates, setMenuCoordinates] = useState();
  const onOpenChange = useCallback((newIsOpen) => {
    setShowMenu(newIsOpen);
    if (ref.current && !newIsOpen) {
      ref.current.focus();
    }
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

  const onContextMenu = (e) => {
    dispatch(
      setIntensity({
        cellIndex,
        sectionIndex,
        intensity: intensity ? 0 : 1,
      })
    );
    e.preventDefault();
  };

  return (
    <div
      ref={ref}
      className={`fadeBg flex flex-row justify-center items-center select-none border border-blue-800 h-10 cursor-pointer ${backgroundClass}`}
      role="button"
      tabIndex={0}
      onContextMenu={onContextMenu}
      onClick={onClick}
      onKeyPress={(e) => {
        onEnter(onClick)(e);
        onSpace(onContextMenu)(e);
      }}
    >
      {intensity ? sound.toLocaleUpperCase() : sound}
      <CellPopupMenu
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
