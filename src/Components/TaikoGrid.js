import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import TaikoGridSettings from "./TaikoGridSettings";
import {
  useSettings,
  setSettings,
  useSections,
  setMainState,
  addSection,
  removeLastSection,
} from "../redux/mainSlice";
import Button from "./Button";
import { getMainFromLocal, saveMainToLocal } from "../redux/store";
import Section from "./Section";

// const chihat = new Audio("/drum-sounds-master/closed-hihat.mp3");
// const snare = new Audio("/drum-sounds-master/acoustic-snare.mp3");
// const bass = new Audio("/drum-sounds-master/bass-drum-1.mp3");
//
// const notes = [chihat, snare, bass];

const TaikoGrid = () => {
  const dispatch = useDispatch();
  const settings = useSettings();
  const sections = useSections();
  const { cellsPerLine, divideEvery, sounds } = settings;

  const soundArray = useMemo(
    () => [null, ...sounds.split(",").map((s) => s.trim())],
    [sounds]
  );

  console.debug("entire taiko grid rerender");

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
              dispatch(addSection());
            }}
            className="m-4"
          >
            Add Section
          </Button>
          <Button
            onClick={() => {
              dispatch(removeLastSection());
            }}
            className="m-4"
          >
            Remove Last Section
          </Button>
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
              console.debug("entire state", state);
              dispatch(setMainState(state));
            }}
            className="m-4"
          >
            Load
          </Button>
        </div>
      </div>
      <div>
        {sections.map((section, sectionIndex) => (
          <Section
            key={section.id}
            cellsPerLine={cellsPerLine}
            divideEvery={divideEvery}
            section={section}
            sectionIndex={sectionIndex}
            soundArray={soundArray}
          />
        ))}
      </div>
    </div>
  );
};

export default TaikoGrid;
