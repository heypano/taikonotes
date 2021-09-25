import React, { memo, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setSoundIndex } from "../redux/mainSlice";
import useOnClickOutside from "../hooks/useOnClickOutside";

const PopupMenu = ({
  cellIndex,
  open,
  onOpenChange,
  soundArray,
  sectionIndex,
}) => {
  const tooltipColumns = Math.ceil(soundArray.length / 4);
  const dispatch = useDispatch();
  const ref = useRef();
  const onClickOutside = useCallback(
    (e) => {
      onOpenChange(false);
      e.preventDefault();
      e.stopPropagation();
    },
    [onOpenChange]
  );
  useOnClickOutside(ref, onClickOutside);
  console.debug("PopupMenu rerender");
  return (
    <div
      ref={ref}
      className={`popupmenu grid grid-rows-4 grid-cols-${tooltipColumns} w-max grid-flow-col max-h-48 ${
        !open ? "invisible" : ""
      }`}
      onClick={onClickOutside}
    >
      {soundArray.map((soundNote, soundIndex) => (
        <div
          className="p-3 hover:bg-blue-200"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(
              setSoundIndex({
                cellIndex,
                sectionIndex,
                soundIndex,
              })
            );
          }}
        >
          {soundNote}
        </div>
      ))}
    </div>
  );
};

PopupMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  cellIndex: PropTypes.number.isRequired,
  soundArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  sectionIndex: PropTypes.number.isRequired,
};

PopupMenu.defaultProps = {};

export default memo(PopupMenu);
