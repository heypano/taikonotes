import React from "react";
import { Provider } from "react-redux";
import TaikoGrid from "./Components/TaikoGrid";
import PageContainer from "./Components/PageContainer";
import { store } from "./redux/store";
import CellPopupMenu from "./Components/CellPopupMenu";
import SectionCommentPopup from "./Components/SectionCommentPopup";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <PageContainer>
          <TaikoGrid />
          <CellPopupMenu />
          <SectionCommentPopup />
        </PageContainer>
      </div>
    </Provider>
  );
}

export default App;
