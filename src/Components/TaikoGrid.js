import React, { useState } from "react";
import Cell from "./Cell";
import TaikoGridSettings from "./TaikoGridSettings";

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
    <div>
      <div className="container settings mt-3 mb-3 flex flex-row">
        <img
          src={`${process.env.PUBLIC_URL}/favicon/taiko_sakura.svg`}
          className="w-1/12"
        />
        <TaikoGridSettings />
      </div>
      <div className="grid grid-cols-8 md:grid-cols-16 border border-blue-800">
        {cells}
      </div>
    </div>
  );
};

export default TaikoGrid;
