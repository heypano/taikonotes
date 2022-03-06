import React, { memo } from "react";
import PropTypes from "prop-types";
import Cell from "./Cell";

const NoteGrid = ({ cellsPerLine, divideEvery, sectionId, numCells }) => {
  const sectionCells = [];
  const mobileDisplayedCells =
    cellsPerLine > 7 ? Math.floor(cellsPerLine / 2) : cellsPerLine;
  for (let cellIndex = 0; cellIndex < numCells; cellIndex++) {
    sectionCells.push(
      <Cell
        key={`cell_${sectionId}_${cellIndex}`}
        isStartingCell={cellIndex % divideEvery === 0}
        isFirstCellInLine={cellIndex % cellsPerLine === 0}
        cellsPerLine={cellsPerLine}
        cellIndex={cellIndex}
        sectionId={sectionId}
      />
    );
  }
  return (
    <div
      className={`bg-blue-500 grid grid-cols-${mobileDisplayedCells} md:grid-cols-${cellsPerLine} border border-blue-800`}
    >
      {sectionCells}
    </div>
  );
};

NoteGrid.propTypes = {
  sectionId: PropTypes.string.isRequired,
  cellsPerLine: PropTypes.number.isRequired,
  divideEvery: PropTypes.number.isRequired,
  numCells: PropTypes.number.isRequired,
};

NoteGrid.defaultProps = {};

export default memo(NoteGrid);
