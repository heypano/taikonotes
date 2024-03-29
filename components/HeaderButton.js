import { memo, forwardRef } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const HeaderButton = forwardRef(({ className, ...props }, ref) => (
  <Button
    className={`p-3 my-1 lg:my-0 ml-0 lg:ml-3 w-28 flex items-center justify-between text-left h-min
                text-white bg-taikoColor1 rounded hover:bg-taikoLightBrown1 hover:text-taikoColor2 ${className}`}
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
