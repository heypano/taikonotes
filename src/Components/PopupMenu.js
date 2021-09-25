import React, { memo, useCallback, useEffect, useRef, useState } from "react";
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
  menuCoordinates,
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
  const [actualPosition, setActualPosition] = useState();
  useOnClickOutside(ref, onClickOutside);
  console.debug("PopupMenu rerender");

  useEffect(() => {
    if (ref.current && menuCoordinates) {
      const left = Math.min(
        menuCoordinates[0],
        window.innerWidth - ref.current.clientWidth - 30
      );
      const top = Math.min(
        menuCoordinates[1] - 50,
        window.innerHeight - ref.current.clientHeight
      );
      setActualPosition({ left, top });
    } else {
      setActualPosition(null);
    }
  }, [open, menuCoordinates]);
  return (
    open && (
      <div
        ref={ref}
        className={`popupmenu grid grid-rows-4 grid-cols-${tooltipColumns} w-max grid-flow-col max-h-48 ${
          actualPosition ? "" : "invisible"
        }`}
        style={actualPosition}
      >
        {soundArray.map((soundNote, soundIndex) => (
          <div
            key={soundIndex}
            className="p-3 hover:bg-blue-200 "
            onClick={(e) => {
              dispatch(
                setSoundIndex({
                  cellIndex,
                  sectionIndex,
                  soundIndex,
                })
              );
              onClickOutside(e);
            }}
          >
            {soundNote}
          </div>
        ))}
      </div>
    )
  );
};

PopupMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  cellIndex: PropTypes.number.isRequired,
  soundArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  menuCoordinates: PropTypes.arrayOf(PropTypes.number),
  sectionIndex: PropTypes.number.isRequired,
};

PopupMenu.defaultProps = { menuCoordinates: undefined };

export default memo(PopupMenu);
