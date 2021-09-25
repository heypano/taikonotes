import React, { memo } from "react";
import { useDispatch } from "react-redux";
import TaikoGridSettings from "./TaikoGridSettings";
import {
  addSection,
  clearState,
  removeLastSection,
  setMainState,
  useSectionIds,
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
  const sectionsIds = useSectionIds();
  console.debug("TaikoGrid rerender");
  return (
    <div>
      <div className="settings mt-3 mb-3 p-3 flex flex-row">
        <img
          src={`${process.env.PUBLIC_URL}/favicon/Taiko.svg`}
          className="w-1/12 pr-2"
          alt="taiko logo"
        />
        <div className="w-full md:w-6/12 lg:w-4/12 border border-blue-300 p-2 mr-auto w-full">
          <TaikoGridSettings />
        </div>
        <div className="w-full md:w-6/12 lg:w-4/12 flex flex-col justify-between">
          <div className="grid grid-rows-2 grid-flow-col">
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
            <Button
              onClick={() => {
                dispatch(clearState());
              }}
              className="m-4"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
      <div>
        {sectionsIds.map((sectionId, sectionIndex) => (
          <Section key={sectionId} sectionId={sectionIndex} />
        ))}
      </div>
    </div>
  );
};

export default memo(TaikoGrid);
