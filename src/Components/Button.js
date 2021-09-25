import React from "react";

/**
 * A component which will show a styled button
 */
const Button = ({ children, className, ...rest }) => (
  <button
    type="button"
    className={`p-3 bg-blue-100 text-gray-800 cursor-pointer hover:opacity-75 ${className}`}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
