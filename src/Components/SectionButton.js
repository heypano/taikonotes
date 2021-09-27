import React, { memo } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const SectionButton = ({ children, onClick }) => (
  <Button
    className="mr-2"
    onClick={onClick}
    onKeyPress={(e) => {
      e.preventDefault();
      e.stopPropagation();
    }}
  >
    {children}
  </Button>
);

SectionButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default memo(SectionButton);
