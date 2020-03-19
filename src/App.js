import React from "react";
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
