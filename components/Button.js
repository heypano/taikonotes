import { forwardRef, memo } from "react";
import PropTypes from "prop-types";

/**
 * A component which will show a styled button
 */
const Button = forwardRef(({ children, className, ...rest }, ref) => (
  <button
    type="button"
    ref={ref}
    className={`text-gray-800 cursor-pointer ${className}`}
    {...rest}
  >
    {children}
  </button>
));

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  className: undefined,
  children: undefined,
};

export default memo(Button);
