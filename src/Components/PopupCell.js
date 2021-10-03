import React, { memo } from "react";
import PropTypes from "prop-types";

const PopupCell = ({ className, ...props }) => (
  <div className={`p-3 hover:bg-blue-200 ${className}`} {...props} />
);
PopupCell.propTypes = {
  className: PropTypes.string,
};
PopupCell.defaultProps = {
  className: "",
};

export default memo(PopupCell);
