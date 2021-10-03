import PropTypes from "prop-types";

/**
 * React class to contain a page
 */
const PageContainer = ({ children }) => (
  <div className="container mx-auto">{children}</div>
);

PageContainer.propTypes = {
  children: PropTypes.node,
};

PageContainer.defaultProps = {
  children: "asd",
};

export default PageContainer;