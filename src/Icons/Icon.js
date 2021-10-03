import React from "react";
import PropTypes from "prop-types";

const Icon = ({ className, children }) => (
  <i className={`inline-flex items-baseline ${className}`}>{children}</i>
);

Icon.propTypes = { className: PropTypes.string, children: PropTypes.node };
Icon.defaultProps = { className: "", children: undefined };

export default Icon;
