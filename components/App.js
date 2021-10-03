import { Provider } from "react-redux";
import PropTypes from "prop-types";
import TaikoGrid from "./TaikoGrid";
import PageContainer from "./PageContainer";
import CellPopupMenu from "./CellPopupMenu";
import SectionCommentPopup from "./SectionCommentPopup";
import { store } from "../redux/store";

function App({ song }) {
  return (
    <Provider store={store}>
      <div className="app">
        <PageContainer>
          <TaikoGrid song={song} />
        </PageContainer>
        <CellPopupMenu />
        <SectionCommentPopup />
      </div>
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
