import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Cell from "./Cell";
import {
  setSectionName,
  setTotalLines,
  useSectionNoCells,
  useSettings,
} from "../redux/mainSlice";
import SectionButton from "./SectionButton";
import GearIcon from "../Icons/GearIcon";
import SectionSettings from "./SectionSettings";

const Section = (props) => {
  const { sectionId } = props;
  const { cellsPerLine, divideEvery } = useSettings(sectionId);
  const [sectionSettingsOpen, setSectionSettingsOpen] = useState(false);
  const dispatch = useDispatch();
  const section = useSectionNoCells(sectionId);
  const { sectionName, totalLines, id } = section;
  const sectionCells = [];
  const numCells = cellsPerLine * totalLines;
  const [sectionSettingsLeft, setSectionSettingsLeft] = useState();
  const [sectionSettingsTop, setSectionSettingsTop] = useState();
  const mobileDisplayedCells =
    cellsPerLine > 7 ? Math.floor(cellsPerLine / 2) : cellsPerLine;
  console.debug(`Section rerender ${sectionName} - ${id}`);
  for (let cellIndex = 0; cellIndex < numCells; cellIndex++) {
    sectionCells.push(
      <Cell
        key={`cell_${sectionId}_${cellIndex}`}
        isStartingCell={cellIndex % divideEvery === 0}
        isFirstCellInLine={cellIndex % cellsPerLine === 0}
        cellsPerLine={cellsPerLine}
        cellIndex={cellIndex}
        sectionIndex={sectionId}
      />
    );
  }
  return (
    <div key={`section_${sectionId}`} className="mb-8 p-1">
      <div className="flex flex-row align-baseline">
        <SectionButton
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
        </SectionButton>

        <SectionButton
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
        </SectionButton>
        <SectionButton
          onClick={(e) => {
            setSectionSettingsOpen(true);
            if (e.clientX && e.clientY) {
              setSectionSettingsLeft(e.clientX);
              setSectionSettingsTop(e.clientY);
            } else if (e.target) {
              const { x, y } = e.target.getBoundingClientRect();
              setSectionSettingsLeft(x);
              setSectionSettingsTop(y);
            }
          }}
        >
          <GearIcon />
          <SectionSettings
            sectionId={sectionId}
            open={sectionSettingsOpen}
            onOpenChange={(isOpen) => {
              setSectionSettingsOpen(isOpen);
            }}
            left={sectionSettingsLeft}
            top={sectionSettingsTop}
          />
        </SectionButton>
        <input
          type="text"
          value={sectionName}
          className="text-2xl w-full outline-none"
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
      <div
        className={`bg-blue-500 grid grid-cols-${mobileDisplayedCells} md:grid-cols-${cellsPerLine} border border-blue-800`}
      >
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
