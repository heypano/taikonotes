import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setSound, useSoundObj } from "../redux/mainSlice";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { onEnter, onSpace } from "../keyboard/util";

const PopupMenu = ({
  cellIndex,
  open,
  onOpenChange,
  sectionIndex,
  menuCoordinates,
}) => {
  const soundObj = useSoundObj();
  const tooltipColumns = Math.ceil(Object.keys(soundObj).length / 4);
  const dispatch = useDispatch();
  const ref = useRef();
  const firstCellRef = useRef();
  const onClickOutside = useCallback(
    (e) => {
      if (open) {
        onOpenChange(false);
        e.stopPropagation();
      }
    },
    [open, onOpenChange]
  );
  const [actualPosition, setActualPosition] = useState();
  useOnClickOutside(ref, onClickOutside);
  console.debug("PopupMenu rerender");

  useEffect(() => {
    if (ref.current && menuCoordinates) {
      const minLeft = 10;
      const minTop = 10;
      const maxLeft = window.innerWidth - ref.current.clientWidth;
      const maxTop = window.innerHeight - ref.current.clientHeight;
      const left = Math.max(Math.min(menuCoordinates[0], maxLeft), minLeft);
      const top = Math.max(Math.min(menuCoordinates[1], maxTop), minTop);
      setActualPosition({ left, top });
      if (firstCellRef.current) {
        setTimeout(() => {
          firstCellRef.current.focus();
        }, 0);
      }
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
        } `}
        style={actualPosition}
      >
        {Object.values(soundObj).map((sound, index) => {
          const onClick = (e) => {
            dispatch(
              setSound({
                cellIndex,
                sectionIndex,
                sound,
              })
            );
            onClickOutside(e);
          };

          return (
            <div
              ref={index === 0 ? firstCellRef : null}
              key={sound}
              className="p-3 hover:bg-blue-200 "
              role="button"
              tabIndex={0}
              onClick={onClick}
              onKeyPress={(e) => {
                onEnter(onClick)(e);
                onSpace(onClickOutside)(e);
              }}
            >
              {sound}
            </div>
          );
        })}
      </div>
    )
  );
};

PopupMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  cellIndex: PropTypes.number.isRequired,
  soundObj: PropTypes.shape({}).isRequired,
  menuCoordinates: PropTypes.arrayOf(PropTypes.number),
  sectionIndex: PropTypes.number.isRequired,
};

PopupMenu.defaultProps = { menuCoordinates: undefined };

export default memo(PopupMenu);
