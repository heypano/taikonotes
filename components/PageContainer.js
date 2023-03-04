import PropTypes from "prop-types";
import { memo } from "react";

/**
 * React class to contain a page
 */
function PageContainer({ children }) {
  return <div className="lg:container mx-auto h-full">{children}</div>
}

PageContainer.propTypes = {
  children: PropTypes.node,
};

PageContainer.defaultProps = {
  children: "asd",
};

export default memo(PageContainer);
