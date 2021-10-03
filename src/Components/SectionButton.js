import React, { memo } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const SectionButton = ({ children, onClick }) => (
  <Button className="mr-2 spinIcon w-10 p-2" onClick={onClick}>
    {children}
  </Button>
);

SectionButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default memo(SectionButton);
