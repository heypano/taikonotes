import React, { memo, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setSound, useSoundObj } from "../redux/mainSlice";
import { onEnter, onSpace } from "../keyboard/util";
import PopupMenu from "./PopupMenu";
import {
  setCellPopupOpen,
  useCellIndex,
  useCellMenuCoordinates,
  useCellPopupOpen,
  useCellSectionIndex,
} from "../redux/cellSlice";

const CellPopupMenu = () => {
  const sectionIndex = useCellSectionIndex();
  const soundObj = useSoundObj(sectionIndex);
  const tooltipColumns = soundObj
    ? Math.ceil(Object.keys(soundObj).length / 4)
    : 0;
  const dispatch = useDispatch();
  const firstCellRef = useRef();
  const cellIndex = useCellIndex();
  const menuCoordinates = useCellMenuCoordinates();
  const open = useCellPopupOpen();

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (firstCellRef.current) {
          firstCellRef.current.focus();
        }
      }, 0);
    }
  }, [open]);

  console.debug("CellPopupMenu rerender");

  return (
    open && (
      <PopupMenu
        className={`grid grid-rows-4 grid-cols-${tooltipColumns} grid-flow-col w-max max-h-48`}
        open={open}
        left={menuCoordinates[0]}
        top={menuCoordinates[1]}
        onOpenChange={(isOpen) => {
          dispatch(setCellPopupOpen(isOpen));
        }}
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
                onEnter(() => {})(e);
                onSpace(onClick)(e);
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

CellPopupMenu.propTypes = {};

CellPopupMenu.defaultProps = {};

export default memo(CellPopupMenu);
