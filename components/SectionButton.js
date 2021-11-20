import { memo } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const SectionButton = ({ children, onClick, bgClassName, ...rest }) => (
  <Button
    className={`mr-2 spinIcon w-10 p-1 xl:p-2 ${bgClassName}`}
    onClick={onClick}
    {...rest}
  >
    {children}
  </Button>
);

SectionButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  bgClassName: PropTypes.string,
};

SectionButton.defaultProps = {
  bgClassName: "bg-blue-100 hover:bg-blue-50",
};

export default memo(SectionButton);
