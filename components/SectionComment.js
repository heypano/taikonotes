import { memo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { sanitize } from "dompurify";
import { useIsEditing, useSectionCommentData } from "../redux/editSlice";
import { setSectionComment, useSectionComment } from "../redux/mainSlice";

function SectionComment({ open, sectionId }) {
  const comment = useSectionComment(sectionId);
  const textareaRef = useRef();
  const dispatch = useDispatch();

  const isEditing = useIsEditing();
  // console.debug("CommentEditMenu rerender");

  const commentRef = useRef(comment);

  return open || !isEditing ? (
    <div
      contentEditable={isEditing}
      className="w-full p-2 resize-none border-taikoLightBrown1 border-2 whitespace-pre-wrap overflow-auto"
      placeholder="Your notes here"
      ref={textareaRef}
      // value={comment}
      onInput={(e) => {
        dispatch(
          setSectionComment({
            sectionId,
            comment: e.currentTarget.innerHTML,
          })
        );
      }}
      dangerouslySetInnerHTML={{
        __html: sanitize(commentRef.current),
      }}
    />
  ) : null;
}

SectionComment.propTypes = {
  sectionId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
};

SectionComment.defaultProps = {};

export default memo(SectionComment);
