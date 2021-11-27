import PropTypes from "prop-types";

/**
 * React class to contain a page
 */
const PageContainer = ({ children }) => (
  <div className="lg:container mx-auto h-full">{children}</div>
);

PageContainer.propTypes = {
  children: PropTypes.node,
};

PageContainer.defaultProps = {
  children: "asd",
};

export default PageContainer;
