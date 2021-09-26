import React, { memo, useCallback, useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setIntensity, setSound, useCell } from "../redux/mainSlice";
import PopupMenu from "./PopupMenu";

const Cell = (props) => {
  const {
    soundObj = [],
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

  // If we want to remove non existent sounds
  // useEffect(() => {
  //   if (!soundObj[currentSound]) {
  //     dispatch(
  //       setSound({
  //         cellIndex,
  //         sectionIndex,
  //         sound: "",
  //       })
  //     );
  //   }
  // }, [currentSound, soundObj, cellIndex, sectionIndex, dispatch]);

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
        soundObj={soundObj}
      />
    </div>
  );
};

Cell.propTypes = {
  isStartingCell: PropTypes.bool.isRequired,
  soundObj: PropTypes.shape({}).isRequired,
  cellIndex: PropTypes.number.isRequired,
  sectionIndex: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool,
};

Cell.defaultProps = {
  isPlaying: undefined,
};

export default memo(Cell);
