import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Cell from "./Cell";
import {
  cloneSection,
  duplicateLastLine,
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
import VideoPlayer from "./VideoPlayer";
import NoteGrid from "./NoteGrid";
import Move from "./Icons/Move";

const SectionTitle = ({ titleURL, sectionName }) => (
  <div className="text-2xl w-full">
    {titleURL ? (
      <a href={titleURL} className="text-linkBlue underline">
        {sectionName}
      </a>
    ) : (
      sectionName
    )}
  </div>
);

const Section = (props) => {
  const {
    sectionId,
    sectionIndex,
    isLinkedSection,
    dragProvided,
    dragSnapshot,
  } = props;
  const { cellsPerLine, divideEvery, videoURL, titleURL } = useSettings(
    sectionId
  );
  const dispatch = useDispatch();
  const isEditing = useIsEditing();
  const section = useSectionNoCells(sectionId);
  const { sectionName, totalLines } = section;
  const comment = useSectionComment(sectionId);

  // console.debug(`Section rerender ${sectionName} - ${id}`);

  const videoId = useMemo(() => {
    let result = null;
    if (videoURL) {
      try {
        const url = new URL(videoURL);
        result = url.searchParams.get("v");
      } catch (e) {
        console.log("Invalid URL -- TODO handle this", e);
      }
    }
    return result;
  }, [videoURL]);

  return (
    <div
      ref={dragProvided.innerRef}
      {...dragProvided.draggableProps}
      style={getItemStyle(
        dragSnapshot.isDragging,
        dragProvided.draggableProps.style
      )}
    >
      <div className="my-4 p-8 px-1 lg:px-8">
        <div className="flex flex-row flex-wrap align-baseline">
          {isEditing && (
            <div className="flex">
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
              <SectionButton {...dragProvided.dragHandleProps} plain>
                <Move />
              </SectionButton>
              <SectionButton
                title="Delete Section"
                aria-label="Delete Section"
                bgClassName="bg-red-400 hover:bg-red-50"
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
            </div>
          )}
          {isEditing && (
            <label
              htmlFor={`section_${sectionId}_name`}
              aria-label="Section name"
              className="flex flex-1 mb-2"
            >
              <textarea
                id={`section_${sectionId}_name`}
                type="text"
                value={sectionName}
                className="flex filter text-2xl w-full outline-none p-2 resize-none shadow-texty"
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
          )}
          {!isEditing && (
            <div className="flex flex-col pb-2 basis-full md:flex-1">
              <SectionTitle sectionName={sectionName} titleURL={titleURL} />
              {comment && <div className="whitespace-pre-wrap">{comment}</div>}
            </div>
          )}
          {videoId && (
            <div className="mb-2">
              <VideoPlayer videoId={videoId} />
            </div>
          )}
        </div>
        <NoteGrid
          sectionId={sectionId}
          cellsPerLine={cellsPerLine}
          totalLines={totalLines}
          divideEvery={divideEvery}
        />
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
