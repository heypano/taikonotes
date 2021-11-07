import { memo, forwardRef } from "react";
import PropTypes from "prop-types";

const PopupCell = forwardRef(({ className, ...props }, ref) => (
  <div className={`p-3 hover:bg-blue-200 ${className}`} ref={ref} {...props} />
));

PopupCell.propTypes = {
  className: PropTypes.string,
};
PopupCell.defaultProps = {
  className: "",
};

export default memo(PopupCell);
