import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Cell from "./Cell";
import { setTotalLines, useSection, useSettings } from "../redux/mainSlice";
import Button from "./Button";

const Section = (props) => {
  const { sectionId } = props;
  const { cellsPerLine, divideEvery, sounds } = useSettings();
  const dispatch = useDispatch();
  const section = useSection(sectionId);
  const soundArray = useMemo(
    () => [null, ...sounds.split(",").map((s) => s.trim())],
    [sounds]
  );
  const { name: sectionName, cells, totalLines, id } = section;
  const sectionCells = [];
  const numCells = cellsPerLine * totalLines;
  console.debug(`Section rerender ${sectionName} - ${id}`);
  for (let cellIndex = 0; cellIndex < numCells; cellIndex++) {
    const cell = cells[cellIndex] || {};
    const { soundIndex = 0 } = cell;
    sectionCells.push(
      <Cell
        key={`cell_${sectionId}_${cellIndex}`}
        isStartingCell={cellIndex % divideEvery === 0}
        cellsPerLine={cellsPerLine}
        cellIndex={cellIndex}
        soundIndex={soundIndex}
        sectionIndex={sectionId}
        soundArray={soundArray}
        sound={soundArray[soundIndex]}
      />
    );
  }
  return (
    <div key={`section_${sectionId}`} className="mb-8">
      <h2 className="text-2xl mb-2">{sectionName}</h2>
      <div className={`grid grid-cols-${cellsPerLine} border border-blue-800`}>
        {sectionCells}
      </div>
      <div>
        <Button
          onClick={() => {
            dispatch(
              setTotalLines({
                sectionIndex: sectionId,
                totalLines: totalLines - 1,
              })
            );
          }}
        >
          -
        </Button>
        <Button
          className="mr-2"
          onClick={() => {
            dispatch(
              setTotalLines({
                sectionIndex: sectionId,
                totalLines: totalLines + 1,
              })
            );
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
};

Section.propTypes = {
  sectionId: PropTypes.number,
};

Section.defaultProps = {
  sectionId: undefined,
};
export default memo(Section);
