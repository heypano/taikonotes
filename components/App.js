import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { store } from "../redux/store";
import Main from "./Main";

const beforeUnloadHandler = (event) => {
  const question = "Are you sure you want to exit?";
  event.preventDefault();
  // eslint-disable-next-line no-param-reassign,no-return-assign
  return (event.returnValue = question);
};

function App({ song, error }) {
  useEffect(() => {
    window.addEventListener("beforeunload", beforeUnloadHandler, {
      capture: true,
    });
  }, []);
  return (
    <Provider store={store}>
      <Main song={song} error={error} />
    </Provider>
  );
}
App.propTypes = {
  song: PropTypes.shape({}),
  error: PropTypes.string,
};
App.defaultProps = {
  song: undefined,
  error: undefined,
};

export default App;
