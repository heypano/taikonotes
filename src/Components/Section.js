import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Cell from "./Cell";
import {
  setSectionName,
  setTotalLines,
  useSectionNoCells,
  useSettings,
} from "../redux/mainSlice";
import Button from "./Button";

const Section = (props) => {
  const { sectionId } = props;
  const { cellsPerLine, divideEvery, sounds } = useSettings();
  const dispatch = useDispatch();
  const section = useSectionNoCells(sectionId);
  const soundArray = useMemo(
    () => [null, ...sounds.split(",").map((s) => s.trim())],
    [sounds]
  );
  const { sectionName, totalLines, id } = section;
  const sectionCells = [];
  const numCells = cellsPerLine * totalLines;
  console.debug(`Section rerender ${sectionName} - ${id}`);
  for (let cellIndex = 0; cellIndex < numCells; cellIndex++) {
    sectionCells.push(
      <Cell
        key={`cell_${sectionId}_${cellIndex}`}
        isStartingCell={cellIndex % divideEvery === 0}
        cellsPerLine={cellsPerLine}
        cellIndex={cellIndex}
        sectionIndex={sectionId}
        soundArray={soundArray}
      />
    );
  }
  return (
    <div key={`section_${sectionId}`} className="mb-8">
      <div>
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
        <Button
          className="mr-2"
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

        <input
          type="text"
          value={sectionName}
          className="text-2xl  outline-none"
          onChange={(e) => {
            dispatch(
              setSectionName({
                sectionIndex: sectionId,
                sectionName: e.target.value,
              })
            );
          }}
        />
      </div>
      <div className={`grid grid-cols-${cellsPerLine} border border-blue-800`}>
        {sectionCells}
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
