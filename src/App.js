import React from "react";
import TaikoGrid from "./Components/TaikoGrid";
import PageContainer from "./Components/PageContainer";
import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <PageContainer>
          <TaikoGrid />
        </PageContainer>
      </div>
    </Provider>
  );
}

export default App;
