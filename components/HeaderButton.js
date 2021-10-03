import { memo } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const HeaderButton = ({ className, ...props }) => (
  <Button
    className={`p-3 flex items-center justify-between text-left bg-blue-100 hover:bg-blue-50 ${className}`}
    {...props}
  />
);
HeaderButton.propTypes = {
  className: PropTypes.string,
};
HeaderButton.defaultProps = {
  className: "",
};
export default memo(HeaderButton);
