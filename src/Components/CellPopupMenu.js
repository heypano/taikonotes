import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setSound, useSoundObj } from "../redux/mainSlice";
import { onEnter, onSpace } from "../keyboard/util";
import PopupMenu from "./PopupMenu";

const CellPopupMenu = ({
  cellIndex,
  open,
  onOpenChange,
  sectionIndex,
  menuCoordinates,
}) => {
  const soundObj = useSoundObj();
  const tooltipColumns = Math.ceil(Object.keys(soundObj).length / 4);
  const dispatch = useDispatch();
  const firstCellRef = useRef();

  useEffect(() => {
    if (open) {
      if (firstCellRef.current) {
        setTimeout(() => {
          firstCellRef.current.focus();
        }, 0);
      }
    }
  }, [open]);

  console.debug("CellPopupMenu rerender");

  return (
    open && (
      <PopupMenu
        className={`grid grid-rows-4 grid-cols-${tooltipColumns} grid-flow-col w-max max-h-48`}
        open={open}
        onOpenChange={onOpenChange}
        left={menuCoordinates[0]}
        top={menuCoordinates[1]}
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
            onOpenChange(false);
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
                onSpace(() => {
                  onOpenChange(false);
                })(e);
              }}
            >
              {sound}
            </div>
          );
        })}
      </PopupMenu>
    )
  );
};

CellPopupMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  cellIndex: PropTypes.number.isRequired,
  menuCoordinates: PropTypes.arrayOf(PropTypes.number),
  sectionIndex: PropTypes.number.isRequired,
};

CellPopupMenu.defaultProps = { menuCoordinates: undefined };

export default memo(CellPopupMenu);