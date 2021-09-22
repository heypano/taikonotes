import React, { useMemo } from "react";
import Cell from "./Cell";
import TaikoGridSettings from "./TaikoGridSettings";
import { useDispatch } from "react-redux";
import {
  useSettings,
  setSettings,
  useSections,
  setSoundIndex,
  setTotalLines,
  setMainState,
} from "../redux/mainSlice";
import Button from "./Button";
import { getMainFromLocal, saveMainToLocal } from "../redux/store";

const chihat = new Audio("/drum-sounds-master/closed-hihat.mp3");
const snare = new Audio("/drum-sounds-master/acoustic-snare.mp3");
const bass = new Audio("/drum-sounds-master/bass-drum-1.mp3");

const notes = [chihat, snare, bass];
console.log(notes);

const TaikoGrid = (props) => {
  const dispatch = useDispatch();
  const settings = useSettings();
  const sections = useSections();
  const { cellsPerLine, divideEvery, sounds } = settings;

  const soundArray = useMemo(
    () => [null, ...sounds.split(",").map((s) => s.trim())],
    [sounds]
  );

  console.log("entire taiko grid rerender");

  return (
    <div>
      <div className="settings mt-3 mb-3 p-3 flex flex-row">
        <img
          src={`${process.env.PUBLIC_URL}/favicon/Taiko.svg`}
          className="w-1/12 pr-2"
          alt="taiko logo"
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
            onClick={() => {
              saveMainToLocal();
            }}
            className="m-4"
          >
            Save
          </Button>
          <Button
            onClick={() => {
              const state = getMainFromLocal();
              console.log(state);
              dispatch(setMainState(state));
            }}
            className="m-4"
          >
            Load
          </Button>
        </div>
      </div>
      <div>
        {sections.map((section, sectionIndex) => {
          const { name: sectionName, cells, totalLines } = section;
          const sectionCells = [];
          const numCells = cellsPerLine * totalLines;
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
            <div key={`section_${sectionIndex}`} className="mb-8">
              <h2 className="text-2xl mb-2">{sectionName}</h2>
              <div
                className={`grid grid-cols-${cellsPerLine} border border-blue-800`}
              >
                {sectionCells}
              </div>
              <div>
                <Button
                  onClick={() => {
                    dispatch(
                      setTotalLines({
                        sectionIndex,
                        totalLines: totalLines - 1,
                      })
                    );
                  }}
                >
                  -
                </Button>
                <Button
                  className="mr-2"
                  onClick={() => {
                    dispatch(
                      setTotalLines({
                        sectionIndex,
                        totalLines: totalLines + 1,
                      })
                    );
                  }}
                >
                  +
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaikoGrid;
