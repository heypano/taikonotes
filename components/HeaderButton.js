import { memo, forwardRef } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const HeaderButton = forwardRef(({ className, ...props }, ref) => (
  <Button
    className={`p-3 w-28 flex items-center justify-between text-left bg-blue-100 hover:bg-blue-50 ${className}`}
    ref={ref}
    {...props}
  />
));
HeaderButton.propTypes = {
  className: PropTypes.string,
};
HeaderButton.defaultProps = {
  className: "",
};
export default memo(HeaderButton);
