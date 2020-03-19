import React, { useState } from "react";
import Cell from "./Cell";
import TaikoGridSettings from "./TaikoGridSettings";

/**
 * React class to Show a Taiko Grid
 */
const TaikoGrid = props => {
  const cells = [];
  const initialSettings = {
    cellsPerLine: "16",
    divideEvery: "4",
    totalLines: "4"
  };
  const [settings, setSettings] = useState(initialSettings);
  const numCells = settings.cellsPerLine * settings.totalLines;
  const addLine = () => {
    setSettings({
      ...settings,
      totalLines: +settings.totalLines + 1 + ""
    });
  };
  const removeLine = () => {
    setSettings({
      ...settings,
      totalLines: +settings.totalLines - 1 + ""
    });
  };
  for (let i = 0; i < numCells; i++) {
    cells.push(
      <Cell
        key={i}
        index={i}
        divideEvery={settings.divideEvery}
        cellsPerLine={settings.cellsPerLine}
      ></Cell>
    );
  }

  return (
    <div>
      <div className="container settings mt-3 mb-3 p-3 flex flex-row">
        <img
          src={`${process.env.PUBLIC_URL}/favicon/taiko_sakura.svg`}
          className="w-1/12"
        />
        <TaikoGridSettings settings={settings} setSettings={setSettings} />
      </div>
      <div
        className={`grid grid-cols-${settings.cellsPerLine} border border-blue-800`}
      >
        {cells}
      </div>
      <div className="flex flex-row justify-between">
        <a className="text-5xl cursor-pointer" onClick={removeLine}>
          ➖
        </a>
        <a className="text-5xl cursor-pointer" onClick={addLine}>
          ➕
        </a>
      </div>
    </div>
  );
};

export default TaikoGrid;
