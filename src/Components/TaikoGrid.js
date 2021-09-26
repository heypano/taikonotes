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
      <div className="settings p-1 mt-3 mb-3 flex flex-col md:flex-row">
        <img
          src={`${process.env.PUBLIC_URL}/favicon/Taiko.svg`}
          className="w-20 pr-2"
          alt="taiko logo"
        />
        <div className="w-full md:w-6/12 lg:w-4/12 border border-blue-300 p-2 flex justify-between mr-3">
          <TaikoGridSettings />
        </div>
        <div className="w-full md:w-6/12 lg:w-4/12 flex flex-col justify-between">
          <div className="mt-2 md:mt-0 grid grid-rows-2 grid-flow-col gap-1">
            <Button
              onClick={() => {
                dispatch(addSection());
              }}
            >
              Add Section
            </Button>
            <Button
              onClick={() => {
                dispatch(removeLastSection());
              }}
            >
              Remove Last Section
            </Button>
            <Button
              onClick={() => {
                saveMainToLocal();
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                const state = getMainFromLocal();
                console.debug("entire state", state);
                dispatch(setMainState(state));
              }}
            >
              Load
            </Button>
            <Button
              onClick={() => {
                dispatch(clearState());
              }}
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
