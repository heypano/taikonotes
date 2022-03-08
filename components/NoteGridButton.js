import React, { memo } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const NoteGridButton = ({ children, onClick, title, ...rest }) => (
  <Button
    className="mr-2 w-10 p-3 xl:p-3 bg-taikoLightBrown1 text-taikoColor2 hover:bg-taikoColor1 hover:text-white"
    onClick={onClick}
    title={title}
    aria-label={title}
    {...rest}
  >
    {children}
  </Button>
);
NoteGridButton.propTypes = {
  sectionId: PropTypes.string.isRequired,
};

NoteGridButton.defaultProps = {};

export default memo(NoteGridButton);
