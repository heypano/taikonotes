import React from "react";
import logo from "./logo.svg";
import TaikoGrid from "./Components/TaikoGrid";
import PageContainer from "./Components/PageContainer";

function App() {
  return (
    <div className="app">
      <PageContainer>
        <TaikoGrid />
      </PageContainer>
    </div>
  );
}

export default App;
