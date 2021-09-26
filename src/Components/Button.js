import React, { memo } from "react";
import PropTypes from "prop-types";

/**
 * A component which will show a styled button
 */
const Button = ({ children, className, ...rest }) => (
  <button
    type="button"
    className={`p-3 bg-blue-100 text-gray-800 cursor-pointer hover:bg-blue-50 ${className}`}
    {...rest}
  >
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  className: undefined,
  children: undefined,
};

export default memo(Button);
