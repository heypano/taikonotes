import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { store } from "../redux/store";
import Main from "./Main";

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
