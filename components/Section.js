import { memo } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Cell from "./Cell";
import {
  cloneSection,
  removeSection,
  setSectionName,
  setTotalLines,
  unlinkSection,
  useSectionComment,
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
import { getItemStyle } from "../lib/dnd";
import Trash from "./Icons/Trash";

const Section = (props) => {
  const {
    sectionId,
    sectionIndex,
    isLinkedSection,
    dragProvided,
    dragSnapshot,
  } = props;
  const { cellsPerLine, divideEvery } = useSettings(sectionId);
  const dispatch = useDispatch();
  const isEditing = useIsEditing();
  const section = useSectionNoCells(sectionId);
  const { sectionName, totalLines } = section;
  const sectionCells = [];
  const comment = useSectionComment(sectionId);
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
    <div
      ref={dragProvided.innerRef}
      {...dragProvided.draggableProps}
      {...dragProvided.dragHandleProps}
      style={getItemStyle(
        dragSnapshot.isDragging,
        dragProvided.draggableProps.style
      )}
    >
      <div className="mb-8 p-1">
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
                      unlinkSection({
                        sectionIndex,
                      })
                    );
                  }}
                >
                  <Lock />
                </SectionButton>
              )}
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
                title="Delete Section"
                aria-label="Delete Section"
                bgClassName="bg-red-100 hover:bg-red-50"
                onClick={() => {
                  dispatch(
                    removeSection({
                      sectionIndex,
                    })
                  );
                }}
              >
                <Trash />
              </SectionButton>
            </>
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
            <div className="flex flex-col p-2">
              <div className="text-2xl w-full">{sectionName}</div>
              {comment && <pre>{comment}</pre>}
            </div>
          )}
        </div>
        <div
          className={`bg-blue-500 grid grid-cols-${mobileDisplayedCells} md:grid-cols-${cellsPerLine} border border-blue-800`}
        >
          {sectionCells}
        </div>
      </div>
    </div>
  );
};

Section.propTypes = {
  sectionId: PropTypes.string,
  sectionIndex: PropTypes.number,
  isLinkedSection: PropTypes.bool,
  dragSnapshot: PropTypes.shape({}),
  dragProvided: PropTypes.shape({}),
};

Section.defaultProps = {
  sectionId: undefined,
  sectionIndex: undefined,
  isLinkedSection: undefined,
  dragSnapshot: undefined,
  dragProvided: undefined,
};
export default memo(Section);
