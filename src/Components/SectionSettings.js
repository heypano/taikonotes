import React from "react";
import PropTypes from "prop-types";
import PopupMenu from "./PopupMenu";

const SectionSettings = ({ open, onOpenChange, left, top }) => (
  <PopupMenu
    open={open}
    onOpenChange={onOpenChange}
    left={left}
    top={top}
    className="w-full h-full border-gray-100"
  >
    a
  </PopupMenu>
);

SectionSettings.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  left: PropTypes.number,
  top: PropTypes.number,
};

SectionSettings.defaultProps = {
  left: undefined,
  top: undefined,
};

export default SectionSettings;
