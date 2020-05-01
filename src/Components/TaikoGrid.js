import React from "react";
import Cell from "./Cell";
import TaikoGridSettings from "./TaikoGridSettings";

/**
 * React class to Show a Taiko Grid
 */
class TaikoGrid extends React.Component {
  constructor(props) {
    super(props);
    const initialSettings = {
      cellsPerLine: "16",
      divideEvery: "4",
      totalLines: "4",
      sounds: "don, kon, ka"
    };
    this.state = {
      settings: initialSettings
    };
    this.cells = [];
    this.addLine = this.addLine.bind(this);
    this.removeLine = this.removeLine.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.submitTest = this.submitTest.bind(this);
  }

  /**
   * Set the settings (passed as prop to children)
   * @param settings
   */
  setSettings(settings) {
    this.setState({
      ...this.state,
      settings: settings
    });
  }

  /**
   * Add a line to the grid
   */
  addLine() {
    this.setSettings({
      ...this.state.settings,
      totalLines: +this.state.settings.totalLines + 1 + ""
    });
  }

  /**
   * Remove a line from the grid
   */
  removeLine() {
    this.setSettings({
      ...this.state.settings,
      totalLines: +this.state.settings.totalLines - 1 + ""
    });
  }

  submitTest() {
    const data = {
      ...this.state.settings,
      song: {
        main: this.getCellIndices()
      }
    };

    console.log(data);
  }

  getCellIndices() {
    return this.cells.map(({ current }) => current.getCurrentSoundIndex());
  }

  render() {
    const cells = [];
    const {
      cellsPerLine,
      totalLines,
      divideEvery,
      sounds
    } = this.state.settings;
    const numCells = cellsPerLine * totalLines;
    const soundArray = sounds.split(",").map(s => s.trim());

    this.cells = [];
    for (let i = 0; i < numCells; i++) {
      const cellRef = React.createRef();
      this.cells.push(cellRef);
      cells.push(
        <Cell
          ref={cellRef}
          key={i}
          index={i}
          divideEvery={divideEvery}
          cellsPerLine={cellsPerLine}
          sounds={soundArray}
        ></Cell>
      );
    }

    return (
      <div>
        <div className="container settings mt-3 mb-3 p-3 flex flex-row">
          <img
            src={`${process.env.PUBLIC_URL}/favicon/Taiko.svg`}
            className="w-1/12 pr-2"
          />
          <TaikoGridSettings
            settings={this.state.settings}
            setSettings={this.setSettings}
          />
        </div>
        <div
          className={`grid grid-cols-${cellsPerLine} border border-blue-800`}
        >
          {cells}
        </div>
        <div className="flex flex-row justify-between">
          <a className="text-5xl cursor-pointer" onClick={this.removeLine}>
            ➖
          </a>
          <a className="text-5xl cursor-pointer" onClick={this.addLine}>
            ➕
          </a>
        </div>
        <a onClick={this.submitTest}>SSSS</a>
      </div>
    );
  }
}

export default TaikoGrid;
