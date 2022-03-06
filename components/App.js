import PropTypes from "prop-types";
import { useEffect } from "react";
import Main from "./Main";
import { useIsDirty } from "../redux/mainSlice";

const beforeUnloadHandler = (event) => {
  const question = "Are you sure you want to exit?";
  event.preventDefault();
  // eslint-disable-next-line no-param-reassign,no-return-assign
  return (event.returnValue = question);
};

function App({ song, error }) {
  const isDirty = useIsDirty();
  useEffect(() => {
    if (isDirty) {
      window.addEventListener("beforeunload", beforeUnloadHandler, {
        capture: true,
      });
    }

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, [isDirty]);
  return <Main song={song} error={error} />;
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
