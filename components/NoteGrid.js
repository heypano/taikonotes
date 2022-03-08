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

const NoteGrid = ({ cellsPerLine, divideEvery, sectionId, totalLines }) => {
  const dispatch = useDispatch();
  const mobileDisplayedCells =
    cellsPerLine > 7 ? Math.floor(cellsPerLine / 2) : cellsPerLine;
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
    const lineCells = [];
    // Collect the cells for this line
    for (let i = 0; i < cellsPerLine; i++) {
      const cellIndex = cellsPerLine * lineNum + i;
      lineCells.push(
        <Cell
          key={`cell_${sectionId}_${cellIndex}`}
          isStartingCell={cellIndex % divideEvery === 0}
          isFirstCellInLine={cellIndex % cellsPerLine === 0}
          isLastCellInLine={cellIndex % cellsPerLine === cellsPerLine - 1}
          isLastLine={lineNum === totalLines - 1}
          cellsPerLine={cellsPerLine}
          cellIndex={cellIndex}
          sectionId={sectionId}
        />
      );
    }
    lines.push(
      <Draggable
        key={`${sectionId}_line_${lineNum}`}
        draggableId={`${sectionId}_line_${lineNum}`}
        index={lineNum}
        isDragDisabled={!isEditing}
      >
        {(dragProvided, dragSnapshot) => (
          <div
            className="flex"
            ref={dragProvided.innerRef}
            {...dragProvided.draggableProps}
            {...dragProvided.dragHandleProps}
            style={getItemStyle(
              dragSnapshot.isDragging,
              dragProvided.draggableProps.style
            )}
          >
            {isEditing && (
              <div className="flex items-center">
                <NoteGridButton
                  sectionId={sectionId}
                  title="Add line here"
                  lineNum={lineNum}
                  onClick={() => {
                    dispatch(
                      setTotalLines({
                        sectionId,
                        totalLines: totalLines + 1,
                        lineNum,
                      })
                    );
                  }}
                >
                  <Plus />
                </NoteGridButton>
                <NoteGridButton
                  sectionId={sectionId}
                  title="Duplicate line"
                  style={{
                    position: "relative",
                  }}
                >
                  <Duplicate
                    style={{
                      width: "40%",
                      position: "absolute",
                      bottom: 3,
                      right: 3,
                    }}
                  />
                  <Plus />
                </NoteGridButton>
                <NoteGridButton sectionId={sectionId} title="Remove this line">
                  <Minus />
                </NoteGridButton>
              </div>
            )}
            <div
              className={`flex-1 bg-blue-500 grid grid-cols-${mobileDisplayedCells} md:grid-cols-${cellsPerLine} border border-1 border-taikoColor1`}
              key={lineNum}
            >
              {lineCells}
            </div>
          </div>
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
