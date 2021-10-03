import React, { memo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import PopupMenu from "./PopupMenu";
import {
  setSectionCommentOpen,
  useSectionCommentData,
} from "../redux/editSlice";
import { setSectionComment, useSectionComment } from "../redux/mainSlice";

const SectionCommentPopup = () => {
  const {
    sectionCommentOpen,
    sectionCommentSectionId,
    sectionCommentCoordinates,
  } = useSectionCommentData();
  const comment = useSectionComment(sectionCommentSectionId);
  const textareaRef = useRef();
  const dispatch = useDispatch();

  console.debug("CommentEditMenu rerender");

  useEffect(() => {
    if (sectionCommentOpen && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current.focus();
      }, 0);
    }
  }, [sectionCommentOpen]);

  return (
    sectionCommentOpen && (
      <PopupMenu
        open={sectionCommentOpen}
        left={sectionCommentCoordinates[0]}
        top={sectionCommentCoordinates[1]}
        onOpenChange={(isOpen) => {
          dispatch(setSectionCommentOpen(isOpen));
        }}
        className="w-1/2"
      >
        <textarea
          className="w-full outline-none p-2 resize-none"
          ref={textareaRef}
          value={comment}
          onChange={(e) => {
            dispatch(
              setSectionComment({
                sectionIndex: sectionCommentSectionId,
                comment: e.target.value,
              })
            );
          }}
        />
      </PopupMenu>
    )
  );
};

SectionCommentPopup.propTypes = {};

SectionCommentPopup.defaultProps = {};

export default memo(SectionCommentPopup);
