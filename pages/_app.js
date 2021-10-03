import "tailwindcss/tailwind.css";
import "../styles/index.css";
import PropTypes from "prop-types";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({}),
};
MyApp.defaultProps = {
  Component: undefined,
  pageProps: undefined,
};

export default MyApp;
