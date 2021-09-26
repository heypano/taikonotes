import React, { memo } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { onEnter } from "../keyboard/util";

const SectionButton = ({ children, onClick }) => (
  <Button className="mr-2" onClick={onClick} onKeyPress={onEnter(onClick)}>
    {children}
  </Button>
);

SectionButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default memo(SectionButton);
