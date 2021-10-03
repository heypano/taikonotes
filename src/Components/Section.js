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
import Minus from "../Icons/Minus";
import Plus from "../Icons/Plus";
import Comment from "../Icons/Comment";
import { setSectionCommentData, useIsEditing } from "../redux/editSlice";
import { getCoordinatesFromEvent } from "../keyboard/util";

const Section = (props) => {
  const { sectionId } = props;
  const { cellsPerLine, divideEvery } = useSettings(sectionId);
  const [sectionSettingsOpen, setSectionSettingsOpen] = useState(false);
  const dispatch = useDispatch();
  const isEditing = useIsEditing();
  const section = useSectionNoCells(sectionId);
  const { sectionName, totalLines, id } = section;
  const sectionCells = [];
  const numCells = cellsPerLine * totalLines;
  const [sectionCoordinates, setSectionCoordinates] = useState(null);
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
        {isEditing && (
          <>
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
              <Plus />
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
              <Minus />
            </SectionButton>
            <SectionButton
              onClick={(e) => {
                setSectionSettingsOpen(true);
                setSectionCoordinates(getCoordinatesFromEvent(e));
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <GearIcon />
              <SectionSettings
                sectionId={sectionId}
                open={sectionSettingsOpen}
                onOpenChange={(isOpen) => {
                  setSectionSettingsOpen(isOpen);
                }}
                left={sectionCoordinates?.[0]}
                top={sectionCoordinates?.[1]}
              />
            </SectionButton>
          </>
        )}
        <SectionButton
          onClick={(e) => {
            dispatch(
              setSectionCommentData({
                sectionCommentOpen: true,
                sectionCommentSectionId: sectionId,
                sectionCommentCoordinates: getCoordinatesFromEvent(e),
              })
            );
          }}
        >
          <Comment />
        </SectionButton>
        {isEditing ? (
          <textarea
            type="text"
            value={sectionName}
            className="text-2xl w-full outline-none p-2 resize-none"
            rows={1}
            onChange={(e) => {
              dispatch(
                setSectionName({
                  sectionIndex: sectionId,
                  sectionName: e.target.value,
                })
              );
            }}
          />
        ) : (
          <div className="text-2xl w-full p-2">{sectionName}</div>
        )}
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
