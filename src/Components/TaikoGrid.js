import React, { useState } from "react";
import Cell from "./Cell";
import TaikoGridSettings from "./TaikoGridSettings";
import Button from "./Button";

const chihat = new Audio("/drum-sounds-master/closed-hihat.mp3");
const snare = new Audio("/drum-sounds-master/acoustic-snare.mp3");
const bass = new Audio("/drum-sounds-master/bass-drum-1.mp3");

const notes = [chihat, snare, bass];

const TaikoGrid = (props) => {
  const [cellsPerLine, setCellsPerLine] = useState(16);
  const [divideEvery, setDivideEvery] = useState(4);
  const [totalLines, setTotalLines] = useState(4);
  const [sounds, setSounds] = useState("don, kon, ka, su, doko, kara");

  const cells = [];
  const numCells = cellsPerLine * totalLines;
  const soundArray = sounds.split(",").map((s) => s.trim());

  for (let i = 0; i < numCells; i++) {
    cells.push(
      <Cell
        key={i}
        isStartingCell={i % divideEvery === 0}
        cellsPerLine={cellsPerLine}
        sounds={[null, ...soundArray]}
      ></Cell>
    );
  }

  return (
    <div>
      <div className="settings mt-3 mb-3 p-3 flex flex-row">
        <img
          src={`${process.env.PUBLIC_URL}/favicon/Taiko.svg`}
          className="w-1/12 pr-2"
        />
        <div className="w-full md:w-6/12 lg:w-4/12 border border-blue-300 p-2 mr-auto w-full">
          <TaikoGridSettings
            settings={{
              cellsPerLine,
              divideEvery,
              totalLines,
              sounds,
            }}
            setSettings={({
              cellsPerLine,
              divideEvery,
              totalLines,
              sounds,
            }) => {
              setCellsPerLine(cellsPerLine);
              setDivideEvery(divideEvery);
              setTotalLines(totalLines);
              setSounds(sounds);
            }}
          />
        </div>
        <div className="w-full md:w-6/12 lg:w-4/12 flex flex-col justify-between">
          {/*<Button onClick={this.submitTest}>Submit</Button>*/}
          {/*<Button onClick={this.playSong} className="m-4">*/}
          {/*  Play*/}
          {/*</Button>*/}
          {/*<Button onClick={this.stopSong} className="m-4">*/}
          {/*  Stop*/}
          {/*</Button>*/}
          <Button onClick={() => setTotalLines(totalLines + 1)} className="m-4">
            Add Line
          </Button>
          <Button onClick={() => setTotalLines(totalLines - 1)} className="m-4">
            Remove Line
          </Button>
        </div>
      </div>
      <div className={`grid grid-cols-${cellsPerLine} border border-blue-800`}>
        {cells}
      </div>
    </div>
  );
};

export default TaikoGrid;
