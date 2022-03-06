import PropTypes from "prop-types";
import { Provider } from "react-redux";
import Main from "./Main";
import { store } from "../redux/store";

function App({ song, error }) {
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
