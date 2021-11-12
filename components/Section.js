import { memo } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Cell from "./Cell";
import {
  cloneSection,
  setSectionName,
  setTotalLines,
  useSectionNoCells,
  useSettings,
} from "../redux/mainSlice";
import SectionButton from "./SectionButton";
import GearIcon from "./Icons/GearIcon";
import Minus from "./Icons/Minus";
import Plus from "./Icons/Plus";
import Comment from "./Icons/Comment";
import {
  setSectionCommentData,
  setSectionSettingData,
  useIsEditing,
} from "../redux/editSlice";
import { getCoordinatesFromEvent } from "../keyboard/util";
import Duplicate from "./Icons/Duplicate";
import Lock from "./Icons/Lock";

const Section = (props) => {
  const { sectionId, sectionIndex, isLinkedSection } = props;
  const { cellsPerLine, divideEvery } = useSettings(sectionId);
  const dispatch = useDispatch();
  const isEditing = useIsEditing();
  const section = useSectionNoCells(sectionId);
  const { sectionName, totalLines } = section;
  const sectionCells = [];
  const numCells = cellsPerLine * totalLines;
  const mobileDisplayedCells =
    cellsPerLine > 7 ? Math.floor(cellsPerLine / 2) : cellsPerLine;
  // console.debug(`Section rerender ${sectionName} - ${id}`);
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
    <div key={`section_${sectionId}`} className="mb-8 p-1">
      <div className="flex flex-row align-baseline">
        {isEditing && (
          <>
            <SectionButton
              title="Add line"
              aria-label="Add line"
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
            </SectionButton>

            <SectionButton
              title="Remove last line"
              aria-label="Remove last line"
              onClick={() => {
                dispatch(
                  setTotalLines({
                    sectionId,
                    totalLines: totalLines - 1,
                  })
                );
              }}
            >
              <Minus />
            </SectionButton>

            <SectionButton
              title="Settings"
              aria-label="Settings"
              onClick={(e) => {
                dispatch(
                  setSectionSettingData({
                    sectionSettingOpen: true,
                    sectionSettingSectionId: sectionId,
                    sectionSettingCoordinates: getCoordinatesFromEvent(e),
                  })
                );
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <GearIcon />
            </SectionButton>
          </>
        )}
        <SectionButton
          title="Section Comment"
          aria-label="Section Comment"
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
        <SectionButton
          title="Duplicate"
          aria-label="Duplicate"
          onClick={() => {
            dispatch(
              cloneSection({
                sectionIndex,
              })
            );
          }}
        >
          <Duplicate />
        </SectionButton>
        {isLinkedSection && (
          <SectionButton
            title="Unlink"
            aria-label="Unlink"
            onClick={() => {
              dispatch(
                cloneSection({
                  sectionIndex,
                })
              );
            }}
          >
            <Lock />
          </SectionButton>
        )}
        {isEditing ? (
          <label
            htmlFor={`section_${sectionId}_name`}
            aria-label="Section name"
            className="w-full"
          >
            <textarea
              id={`section_${sectionId}_name`}
              type="text"
              value={sectionName}
              className="flex filter drop-shadow text-2xl w-full outline-none p-2 resize-none"
              rows={1}
              onChange={(e) => {
                dispatch(
                  setSectionName({
                    sectionId,
                    sectionName: e.target.value,
                  })
                );
              }}
            />
          </label>
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
  sectionId: PropTypes.string,
  sectionIndex: PropTypes.number,
  isLinkedSection: PropTypes.bool,
};

Section.defaultProps = {
  sectionId: undefined,
  sectionIndex: undefined,
  isLinkedSection: undefined,
};
export default memo(Section);
