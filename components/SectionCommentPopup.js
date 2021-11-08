import { memo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import PopupMenu from "./PopupMenu";
import {
  setSectionCommentOpen,
  useIsEditing,
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
  const isEditing = useIsEditing();
  // console.debug("CommentEditMenu rerender");

  useEffect(() => {
    if (sectionCommentOpen && textareaRef.current) {
      setTimeout(() => {
        textareaRef.current.focus();
      }, 0);
    }
  }, [sectionCommentOpen]);

  const hasContent = isEditing || comment;
  return sectionCommentOpen && hasContent ? (
    <PopupMenu
      open={sectionCommentOpen}
      left={sectionCommentCoordinates[0]}
      top={sectionCommentCoordinates[1]}
      onOpenChange={(isOpen) => {
        dispatch(setSectionCommentOpen(isOpen));
      }}
      className={isEditing ? "w-1/2 h-1/2" : "max-w-lg"}
    >
      {isEditing ? (
        <textarea
          className="w-full h-full outline-none p-2 resize-none"
          placeholder="Your notes here"
          ref={textareaRef}
          value={comment}
          onChange={(e) => {
            dispatch(
              setSectionComment({
                sectionId: sectionCommentSectionId,
                comment: e.target.value,
              })
            );
          }}
        />
      ) : (
        <div className="w-full h-full whitespace-pre-wrap p-2 overflow-auto">
          {comment}
        </div>
      )}
    </PopupMenu>
  ) : null;
};

SectionCommentPopup.propTypes = {};

SectionCommentPopup.defaultProps = {};

export default memo(SectionCommentPopup);
