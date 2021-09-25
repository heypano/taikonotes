import React from "react";
import { Provider } from "react-redux";
import TaikoGrid from "./Components/TaikoGrid";
import PageContainer from "./Components/PageContainer";
import { store } from "./redux/store";

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
