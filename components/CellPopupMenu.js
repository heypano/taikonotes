import { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCellComment,
  setSound,
  useCell,
  useSoundObj,
} from "../redux/mainSlice";
import { onSpace } from "../keyboard/util";
import PopupMenu from "./PopupMenu";
import {
  setCellPopupOpen,
  useCellIndex,
  useCellMenuCoordinates,
  useCellPopupOpen,
  useCellSectionIndex,
} from "../redux/cellSlice";
import Comment from "./Icons/Comment";
import PopupCell from "./PopupCell";
import { useIsEditing } from "../redux/editSlice";

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
  const isEditing = useIsEditing();
  const [isCommenting, setIsCommenting] = useState(false);
  const textareaRef = useRef();
  const { comment } = useCell(sectionIndex, cellIndex);

  useEffect(() => {
    if (isCommenting && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isCommenting]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        if (firstCellRef.current) {
          firstCellRef.current.focus();
        }
      }, 0);
      setIsCommenting(false);
    }
  }, [open]);

  // console.debug("CellPopupMenu rerender");

  const hasContent = isEditing || comment;

  return open && hasContent ? (
    <PopupMenu
      open={open}
      left={menuCoordinates[0]}
      top={menuCoordinates[1]}
      onOpenChange={(isOpen) => {
        dispatch(setCellPopupOpen(isOpen));
      }}
    >
      <div className="flex">
        {!isCommenting && isEditing && (
          <div
            className={`grid grid-rows-4 grid-cols-${tooltipColumns} grid-flow-col w-max max-h-48`}
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
                <PopupCell
                  ref={index === 0 ? firstCellRef : null}
                  key={sound}
                  role="button"
                  tabIndex={0}
                  onClick={onClick}
                  onKeyPress={(e) => {
                    onSpace(onClick)(e);
                  }}
                >
                  {sound}
                </PopupCell>
              );
            })}
          </div>
        )}
        {isCommenting && isEditing && (
          <div className="grid grid-rows-1 grid-cols-1 grid-flow-col w-max max-h-48">
            <textarea
              ref={textareaRef}
              className="w-full h-full resize-none p-2 outline-none"
              placeholder="Your notes here"
              onChange={(e) => {
                dispatch(
                  setCellComment({
                    cellIndex,
                    sectionIndex,
                    comment: e.target.value,
                  })
                );
              }}
              value={comment}
            />
          </div>
        )}
        {isEditing && (
          <div className="border-0 border-l-2 border-gray-200 grid grid-rows-4 grid-cols-1 grid-flow-col w-max max-h-48">
            <PopupCell
              className={`${
                isCommenting ? "bg-blue-300" : ""
              } flex items-center justify-center w-12`}
              onClick={() => {
                setIsCommenting(!isCommenting);
              }}
            >
              <Comment />
            </PopupCell>
          </div>
        )}
        {!isEditing && comment && (
          <div className="p-3 max-w-sm whitespace-pre-wrap">{comment}</div>
        )}
      </div>
    </PopupMenu>
  ) : null;
};

CellPopupMenu.propTypes = {};

CellPopupMenu.defaultProps = {};

export default memo(CellPopupMenu);
