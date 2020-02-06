import React, { useState } from "react";

/**
 * React class to Show a Taiko Grid
 */
const TaikoGrid = props => {
  const numCells = 224;
  const cells = [];
  for (let i = 0; i < numCells; i++) {
    cells.push(<Cell key={i} index={i} numCells={numCells}></Cell>);
  }
  return (
    <div className="grid grid-cols-8 md:grid-cols-16 border border-blue-800">
      {cells}
    </div>
  );
};

const Cell = ({ index, numCells }) => {
  const [clicked, setClicked] = useState(false);

  let extraClass = "";
  if (index < 16) {
    extraClass += "border-t-0";
  }
  if (index < 16) {
    extraClass += "border-t-0";
  }
  return (
    <div
      className={`border border-blue-800 h-10 cursor-pointer ${
        clicked ? "bg-gray-900 hover:bg-gray-600" : "hover:bg-gray-300"
      }`}
      onClick={() => {
        console.log(clicked);
        setClicked(!clicked);
      }}
    ></div>
  );
};

export default TaikoGrid;
