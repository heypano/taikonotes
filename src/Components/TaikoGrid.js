import React from "react";

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
    <table className="grid grid-cols-8 md:grid-cols-16 border border-blue-800">
      {cells}
    </table>
  );
};

const Cell = ({ index, numCells }) => {
  let extraClass = "";
  if (index < 16) {
    extraClass += "border-t-0";
  }
  if (index < 16) {
    extraClass += "border-t-0";
  }
  return <div className="border border-blue-800 h-10 "></div>;
};

export default TaikoGrid;
