import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { getItemStyle } from "../lib/dnd";
import NoteGridButton from "./NoteGridButton";
import {
  setTotalLines,
  moveLineInSection,
  duplicateLineInSection,
  addLineInSection,
  removeLineInSection,
} from "../redux/mainSlice";
import Plus from "./Icons/Plus";
import Duplicate from "./Icons/Duplicate";
import Minus from "./Icons/Minus";
import { useIsEditing } from "../redux/editSlice";
import Cell from "./Cell";
import Move from "./Icons/Move";

function NoteGridLine({
  sectionId,
  lineNum,
  cellsPerLine,
  totalLines,
  divideEvery,
  dragSnapshot,
  dragProvided,
}) {
  const dispatch = useDispatch();
  const mobileDisplayedCells =
    cellsPerLine > 7 ? Math.floor(cellsPerLine / 2) : cellsPerLine;
  const isEditing = useIsEditing();
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
  return (
    <div
      className="flex"
      data-id={`line ${lineNum}`}
      ref={dragProvided.innerRef}
      {...dragProvided.draggableProps}
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
                addLineInSection({
                  sectionId,
                  index: lineNum,
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
            onClick={() => {
              dispatch(
                duplicateLineInSection({
                  sectionId,
                  index: lineNum,
                })
              );
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
          <NoteGridButton
            sectionId={sectionId}
            title="Remove this line"
            onClick={() => {
              dispatch(
                removeLineInSection({
                  sectionId,
                  index: lineNum,
                })
              );
            }}
          >
            <Minus />
          </NoteGridButton>
          <span {...dragProvided.dragHandleProps}>
            <NoteGridButton
              style={{
                cursor: dragSnapshot.isDragging ? "grabbing" : "grab",
              }}
              plain
            >
              <Move />
            </NoteGridButton>
          </span>
        </div>
      )}
      <div
        className={`flex-1 bg-blue-500 grid grid-cols-${mobileDisplayedCells} md:grid-cols-${cellsPerLine} border border-1 border-taikoColor1`}
        key={lineNum}
      >
        {lineCells}
      </div>
    </div>
  );
}

NoteGridLine.propTypes = {
  sectionId: PropTypes.string.isRequired,
  lineNum: PropTypes.number.isRequired,
  cellsPerLine: PropTypes.number.isRequired,
  totalLines: PropTypes.number.isRequired,
  divideEvery: PropTypes.number.isRequired,
  dragSnapshot: PropTypes.shape({}),
  dragProvided: PropTypes.shape({}),
};

NoteGridLine.defaultProps = {};

export default NoteGridLine;
