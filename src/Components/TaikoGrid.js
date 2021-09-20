import React from "react";
import Cell from "./Cell";
import TaikoGridSettings from "./TaikoGridSettings";
import Button from "./Button";

const chihat = new Audio("/drum-sounds-master/closed-hihat.mp3");
const snare = new Audio("/drum-sounds-master/acoustic-snare.mp3");
const bass = new Audio("/drum-sounds-master/bass-drum-1.mp3");

const notes = [chihat, snare, bass];
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
      sounds: "hihat, snare, bass"
    };
    this.state = {
      settings: initialSettings,
      noteIndex: null,
      isPlaying: false
    };
    this.cells = [];
    this.addLine = this.addLine.bind(this);
    this.removeLine = this.removeLine.bind(this);
    this.setSettings = this.setSettings.bind(this);
    this.submitTest = this.submitTest.bind(this);
    this.playSound = this.playSound.bind(this);
    this.playSong = this.playSong.bind(this);
    this.stopSong = this.stopSong.bind(this);
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

  submitTest(e) {
    e.preventDefault();
    const data = {
      ...this.state.settings,
      song: {
        main: this.getCellIndices()
      }
    };
    console.log(data);
  }

  playSong() {
    if (this.playTimer) {
      this.setState({
        isPlaying: true,
        noteIndex: null
      });
    } else {
      this.playTimer = setInterval(() => {
        const song = this.getCellIndices();
        const noteIndex = Number.isInteger(this.state.noteIndex)
          ? this.state.noteIndex + 1
          : 0;
        this.setState({
          isPlaying: true,
          noteIndex: noteIndex
        });
        if (Number.isInteger(song[noteIndex]) && notes[song[noteIndex]]) {
          notes[song[noteIndex]].currentTime = 0;
          notes[song[noteIndex]].play();
        }
      }, 200);
    }
  }
  stopSong() {
    if (this.playTimer) {
      clearInterval(this.playTimer);
      this.playTimer = null;
    }
    this.setState({
      isPlaying: false,
      noteIndex: null
    });
  }

  playSound(index) {
    this.getCellIndices();
  }

  getCellIndices() {
    return this.cells.map(({ current }) => current.getCurrentSoundIndex());
  }

  render() {
    const cells = [];
    const { noteIndex, isPlaying, settings } = this.state;
    const { cellsPerLine, totalLines, divideEvery, sounds } = settings;
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
          isPlaying={isPlaying && i === noteIndex}
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
              settings={this.state.settings}
              setSettings={this.setSettings}
            />
          </div>
          <div className="w-full md:w-6/12 lg:w-4/12 flex flex-col justify-between">
            {/*<Button onClick={this.submitTest}>Submit</Button>*/}
            <Button onClick={this.playSong} className="m-4">
              Play
            </Button>
            <Button onClick={this.stopSong} className="m-4">
              Stop
            </Button>
            <Button onClick={this.addLine} className="m-4">
              Add Line
            </Button>
            <Button onClick={this.removeLine} className="m-4">
              Remove Line
            </Button>
          </div>
        </div>
        <div
          className={`grid grid-cols-${cellsPerLine} border border-blue-800`}
        >
          {cells}
        </div>
      </div>
    );
  }
}

export default TaikoGrid;
