import React from "react";
import PropTypes from "prop-types";
import PopupMenu from "./PopupMenu";

const SectionSettings = ({ open, onOpenChange, left, top }) => (
  <PopupMenu
    open={open}
    onOpenChange={onOpenChange}
    left={left}
    top={top}
    className="grid grid-rows-1 grid-cols-1 w-max max-h-48 border-gray-100 p-4"
  >
    Settings here
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
