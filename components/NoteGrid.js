import React, { memo } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Cell from "./Cell";
import NoteGridButton from "./NoteGridButton";
import Duplicate from "./Icons/Duplicate";
import { useIsEditing } from "../redux/editSlice";
import Plus from "./Icons/Plus";
import Minus from "./Icons/Minus";
import { setTotalLines } from "../redux/mainSlice";

const NoteGrid = ({ cellsPerLine, divideEvery, sectionId, totalLines }) => {
  const dispatch = useDispatch();
  const mobileDisplayedCells =
    cellsPerLine > 7 ? Math.floor(cellsPerLine / 2) : cellsPerLine;
  const lines = [];
  const isEditing = useIsEditing();
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
      <div className="flex">
        {isEditing && (
          <div className="flex items-center">
            <NoteGridButton
              sectionId={sectionId}
              title="Add line here"
              onClick={() => {
                dispatch(
                  setTotalLines({
                    sectionId,
                    totalLines: totalLines + 1,
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
    );
  }
  return totalLines > 0 ? (
    <div className="border border-1 border-x-0 border-taikoColor1">{lines}</div>
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
