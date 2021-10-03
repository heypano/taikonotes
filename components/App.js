import { Provider } from "react-redux";
import PropTypes from "prop-types";
import { store } from "../redux/store";
import Main from "./Main";

function App({ song }) {
  return (
    <Provider store={store}>
      <Main song={song} />
    </Provider>
  );
}
App.propTypes = {
  song: PropTypes.shape({}),
};
App.defaultProps = {
  song: undefined,
};

export default App;
