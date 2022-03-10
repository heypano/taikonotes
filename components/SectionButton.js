import { memo } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const SectionButton = ({ children, onClick, bgClassName, plain, ...rest }) =>
  plain ? (
    <div
      className={`flex mr-2 w-10 p-3 xl:p-3 hover:text-taikoColor2 border-b-8 border-taikoLightBrown1 text-white ${bgClassName}`}
      {...rest}
    >
      {children}
    </div>
  ) : (
    <Button
      className={`mr-2 w-10 p-3 xl:p-3 hover:text-taikoColor2 border-b-8 border-taikoLightBrown1 text-white ${bgClassName}`}
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
  plain: PropTypes.bool,
};

SectionButton.defaultProps = {
  bgClassName: "bg-taikoColor1 hover:bg-taikoLightBrown1",
};

export default memo(SectionButton);
