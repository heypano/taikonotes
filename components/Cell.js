import { memo, useRef } from "react";
import * as PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setIntensity, useCell, useSoundObj } from "../redux/mainSlice";
import { getCoordinatesFromEvent, onEnter, onSpace } from "../keyboard/util";
import { setCellPopupState } from "../redux/cellPopupSlice";
import Comment from "./Icons/Comment";
import { useIsEditing } from "../redux/editSlice";

const Cell = (props) => {
  const {
    cellIndex,
    sectionId,
    isPlaying,
    isStartingCell,
    isFirstCellInLine,
    cellsPerLine,
  } = props;
  const ref = useRef();
  const dispatch = useDispatch();
  const soundObj = useSoundObj(sectionId);
  const isEditing = useIsEditing();
  const { sound: currentSound = 0, intensity, comment } = useCell(
    sectionId,
    cellIndex
  );
  const sound = (currentSound && soundObj[currentSound]) || "";
  let backgroundClass = "bg-white hover:bg-taikoLightBrown1";
  if (isPlaying) {
    backgroundClass = "bg-red-300 hover:bg-red-600";
  } else if (isStartingCell) {
    backgroundClass = "bg-taikoLightBrown2 hover:bg-taikoColor3";
  }
  const borderClass = "border border-taikoColor2";

  // when we show fewer cells per line, help identify the start of every line
  // if (isFirstCellInLine && cellsPerLine % 2 === 1) {
  //   borderClass = "border-2 border-red-400 md:border md:border-blue-800";
  // }

  // console.debug(`Cell rerender ${cellIndex}`);

  const onClick = (e) => {
    const menuCoordinates = getCoordinatesFromEvent(e);
    dispatch(
      setCellPopupState({
        cellIndex,
        sectionId,
        open: true,
        menuCoordinates,
      })
    );
    e.preventDefault();
  };

  const onContextMenu = (e) => {
    if (isEditing) {
      dispatch(
        setIntensity({
          cellIndex,
          sectionId,
          intensity: intensity ? 0 : 1,
        })
      );
      e.preventDefault();
    }
  };

  const finalSound = intensity ? sound.toLocaleUpperCase() : sound;
  const shouldOnClick = isEditing || comment;
  const shouldOnHover = !isEditing && comment;
  return (
    <div
      ref={ref}
      className={`fadeBg relative select-none h-10 cursor-pointer ${borderClass} ${backgroundClass}`}
      role="button"
      aria-label={`Cell ${cellIndex} from section ${sectionId}`}
      tabIndex={0}
      onContextMenu={onContextMenu}
      onClick={shouldOnClick ? onClick : null}
      onMouseEnter={shouldOnHover ? onClick : null}
      onKeyPress={(e) => {
        onEnter(onContextMenu)(e);
        onSpace(onClick)(e);
      }}
    >
      <div className="absolute w-full h-full flex flex-row items-center justify-center">
        <div className="overflow-hidden truncate" title={finalSound}>
          {finalSound}
        </div>
      </div>
      {comment && (
        <div className="absolute w-full h-full grid grid-rows-2 grid-cols-3">
          <div className="col-start-3 col-end-3 flex justify-end">
            <Comment className="w-full" />
          </div>
        </div>
      )}
    </div>
  );
};

Cell.propTypes = {
  isStartingCell: PropTypes.bool.isRequired,
  isFirstCellInLine: PropTypes.bool.isRequired,
  cellIndex: PropTypes.number.isRequired,
  sectionId: PropTypes.string.isRequired,
  cellsPerLine: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool,
};

Cell.defaultProps = {
  isPlaying: undefined,
};

export default memo(Cell);
