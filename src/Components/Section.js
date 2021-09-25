import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Cell from "./Cell";
import { setSoundIndex, setTotalLines } from "../redux/mainSlice";
import Button from "./Button";

const Section = (props) => {
  const {
    section,
    sectionIndex,
    cellsPerLine,
    divideEvery,
    soundArray,
  } = props;
  const { name: sectionName, cells, totalLines } = section;
  const sectionCells = [];
  const numCells = cellsPerLine * totalLines;
  const dispatch = useDispatch();
  for (let cellIndex = 0; cellIndex < numCells; cellIndex++) {
    const cell = cells[cellIndex] || {};
    const { soundIndex = 0 } = cell;
    sectionCells.push(
      <Cell
        key={`cell_${sectionIndex}_${cellIndex}`}
        isStartingCell={cellIndex % divideEvery === 0}
        cellsPerLine={cellsPerLine}
        sound={soundArray[soundIndex]}
        onClick={() => {
          const nextSoundsIndex = (soundIndex + 1) % soundArray.length;
          dispatch(
            setSoundIndex({
              cellIndex,
              sectionIndex,
              soundIndex: nextSoundsIndex,
            })
          );
        }}
        onContextMenu={() =>
          dispatch(
            setSoundIndex({
              cellIndex,
              sectionIndex,
              soundIndex: 0,
            })
          )
        }
      />
    );
  }
  return (
    <div key={`section_${sectionIndex}`} className="mb-8">
      <h2 className="text-2xl mb-2">{sectionName}</h2>
      <div className={`grid grid-cols-${cellsPerLine} border border-blue-800`}>
        {sectionCells}
      </div>
      <div>
        <Button
          onClick={() => {
            dispatch(
              setTotalLines({
                sectionIndex,
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
                sectionIndex,
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
  section: PropTypes.shape({}),
  sectionIndex: PropTypes.number,
  cellsPerLine: PropTypes.number,
  divideEvery: PropTypes.number,
  soundArray: PropTypes.arrayOf(PropTypes.string),
};

Section.defaultProps = {
  section: undefined,
  sectionIndex: undefined,
  cellsPerLine: undefined,
  divideEvery: undefined,
  soundArray: undefined,
};
export default Section;
