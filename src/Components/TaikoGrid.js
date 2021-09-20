import React, { useMemo } from "react";
import Cell from "./Cell";
import TaikoGridSettings from "./TaikoGridSettings";
import Button from "./Button";
import { useDispatch } from "react-redux";
import {
  setTotalLines,
  useSettings,
  setSettings,
  useSections,
  setSoundIndex,
} from "../redux/mainSlice";

const chihat = new Audio("/drum-sounds-master/closed-hihat.mp3");
const snare = new Audio("/drum-sounds-master/acoustic-snare.mp3");
const bass = new Audio("/drum-sounds-master/bass-drum-1.mp3");

const notes = [chihat, snare, bass];

const TaikoGrid = (props) => {
  const dispatch = useDispatch();
  const settings = useSettings();
  const sections = useSections();
  const { cellsPerLine, divideEvery, totalLines, sounds } = settings;

  const numCells = cellsPerLine * totalLines;
  const soundArray = useMemo(
    () => [null, ...sounds.split(",").map((s) => s.trim())],
    [sounds]
  );
  console.log(sections);

  return (
    <div>
      <div className="settings mt-3 mb-3 p-3 flex flex-row">
        <img
          src={`${process.env.PUBLIC_URL}/favicon/Taiko.svg`}
          className="w-1/12 pr-2"
        />
        <div className="w-full md:w-6/12 lg:w-4/12 border border-blue-300 p-2 mr-auto w-full">
          <TaikoGridSettings
            settings={settings}
            setSettings={(s) => {
              dispatch(setSettings(s));
            }}
          />
        </div>
        <div className="w-full md:w-6/12 lg:w-4/12 flex flex-col justify-between">
          <Button
            onClick={() =>
              dispatch(setSettings({ totalLines: totalLines + 1 }))
            }
            className="m-4"
          >
            Add Line
          </Button>
          <Button
            onClick={() =>
              dispatch(setSettings({ totalLines: totalLines - 1 }))
            }
            className="m-4"
          >
            Remove Line
          </Button>
        </div>
      </div>
      <div>
        {sections.map((section, sectionIndex) => {
          const { name: sectionName, cells } = section;
          const sectionCells = [];
          for (let cellIndex = 0; cellIndex < numCells; cellIndex++) {
            const cell = cells[cellIndex] || {};
            const { soundIndex = 0 } = cell;
            sectionCells.push(
              <Cell
                key={`cell_${sectionIndex}_${cellIndex}`}
                isStartingCell={cellIndex % divideEvery === 0}
                cellsPerLine={cellsPerLine}
                sound={soundArray[soundIndex]}
                onClick={() => {
                  const nextSoundsIndex = (soundIndex + 1) % soundArray.length;
                  dispatch(
                    setSoundIndex({
                      cellIndex,
                      sectionIndex,
                      soundIndex: nextSoundsIndex,
                    })
                  );
                }}
                onContextMenu={() =>
                  dispatch(
                    setSoundIndex({
                      cellIndex,
                      sectionIndex,
                      soundIndex: 0,
                    })
                  )
                }
              ></Cell>
            );
          }
          return (
            <div key={`section_${sectionIndex}`}>
              <h2 className="text-2xl mb-2">{sectionName}</h2>
              <div
                className={`mb-8 grid grid-cols-${cellsPerLine} border border-blue-800`}
              >
                {sectionCells}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaikoGrid;
