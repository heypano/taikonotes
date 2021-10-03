import { Provider } from "react-redux";
import TaikoGrid from "./TaikoGrid";
import PageContainer from "./PageContainer";
import CellPopupMenu from "./CellPopupMenu";
import SectionCommentPopup from "./SectionCommentPopup";
import { store } from "../redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <PageContainer>
          <TaikoGrid />
        </PageContainer>
        <CellPopupMenu />
        <SectionCommentPopup />
      </div>
    </Provider>
  );
}

export default App;
