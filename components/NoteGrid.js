import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Cell from "./Cell";
import NoteGridButton from "./NoteGridButton";
import Duplicate from "./Icons/Duplicate";
import { useIsEditing } from "../redux/editSlice";
import Plus from "./Icons/Plus";
import Minus from "./Icons/Minus";
import { moveSection, setTotalLines } from "../redux/mainSlice";
import { getItemStyle, getListStyle } from "../lib/dnd";
import NoteGridLine from "./NoteGridLine";

const NoteGrid = ({ cellsPerLine, divideEvery, sectionId, totalLines }) => {
  const lines = [];
  const isEditing = useIsEditing();
  const onDragStart = useCallback(() => {
    // Add a little vibration if the browser supports it.
    // Add's a nice little physical feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  }, []);
  const onDragEnd = useCallback((result) => {
    console.log("aa", result);
  }, []);

  for (let lineNum = 0; lineNum < totalLines; lineNum++) {
    lines.push(
      <Draggable
        key={`${sectionId}_line_${lineNum}`}
        draggableId={`${sectionId}_line_${lineNum}`}
        index={lineNum}
        isDragDisabled={!isEditing}
      >
        {(dragProvided, dragSnapshot) => (
          <NoteGridLine
            sectionId={sectionId}
            lineNum={lineNum}
            cellsPerLine={cellsPerLine}
            totalLines={totalLines}
            divideEvery={divideEvery}
            dragProvided={dragProvided}
            dragSnapshot={dragSnapshot}
          />
        )}
      </Draggable>
    );
  }
  return totalLines > 0 ? (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <Droppable droppableId={`section_${sectionId}`}>
        {(dropProvided, dropSnapshot) => (
          <div
            {...dropProvided.droppableProps}
            ref={dropProvided.innerRef}
            style={getListStyle(dropSnapshot.isDraggingOver)}
            className="border border-1 border-x-0 border-taikoColor1"
          >
            {lines}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  ) : null;
};

NoteGrid.propTypes = {
  sectionId: PropTypes.string.isRequired,
  cellsPerLine: PropTypes.number.isRequired,
  divideEvery: PropTypes.number.isRequired,
  totalLines: PropTypes.number.isRequired,
};

NoteGrid.defaultProps = {};

export default memo(NoteGrid);
