import React, { memo, useRef } from "react";
import * as PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setIntensity, useCell, useSoundObj } from "../redux/mainSlice";
import { onEnter, onSpace } from "../keyboard/util";
import { setCellPopupState } from "../redux/cellSlice";

const Cell = (props) => {
  const {
    cellIndex,
    sectionIndex,
    isPlaying,
    isStartingCell,
    isFirstCellInLine,
    cellsPerLine,
  } = props;
  const ref = useRef();
  const dispatch = useDispatch();
  const soundObj = useSoundObj(sectionIndex);

  const { sound: currentSound = 0, intensity } = useCell(
    sectionIndex,
    cellIndex
  );
  const sound = (currentSound && soundObj[currentSound]) || "";
  let backgroundClass = "bg-white hover:bg-blue-400";
  if (isPlaying) {
    backgroundClass = "bg-red-300 hover:bg-red-600";
  } else if (isStartingCell) {
    backgroundClass = "bg-gray-300 hover:bg-blue-400";
  }
  let borderClass = "border border-blue-800";

  // when we show fewer cells per line, help identify the start of every line
  if (isFirstCellInLine && cellsPerLine % 2 === 1) {
    borderClass = "border-2 border-red-400 md:border md:border-blue-800";
  }

  console.debug(`Cell rerender ${cellIndex}`);

  const onClick = (e) => {
    let menuCoordinates;
    if (e.clientX && e.clientY) {
      menuCoordinates = [e.clientX, e.clientY];
    } else if (e.target) {
      const { x, y } = e.target.getBoundingClientRect();
      menuCoordinates = [x, y];
    }
    dispatch(
      setCellPopupState({
        cellIndex,
        sectionIndex,
        open: true,
        menuCoordinates,
      })
    );
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
      className={`fadeBg flex flex-row justify-center items-center select-none h-10 cursor-pointer ${borderClass} ${backgroundClass}`}
      role="button"
      tabIndex={0}
      onContextMenu={onContextMenu}
      onClick={onClick}
      onKeyPress={(e) => {
        onEnter(onContextMenu)(e);
        onSpace(onClick)(e);
      }}
    >
      {intensity ? sound.toLocaleUpperCase() : sound}
    </div>
  );
};

Cell.propTypes = {
  isStartingCell: PropTypes.bool.isRequired,
  isFirstCellInLine: PropTypes.bool.isRequired,
  cellIndex: PropTypes.number.isRequired,
  sectionIndex: PropTypes.number.isRequired,
  cellsPerLine: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool,
};

Cell.defaultProps = {
  isPlaying: undefined,
};

export default memo(Cell);
