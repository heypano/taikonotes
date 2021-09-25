/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { shallowEqual, useSelector } from "react-redux";

export const name = "main";

export const initialState = {
  sections: [
    {
      cells: [
        {
          soundIndex: 1,
        },
        null,
        {
          soundIndex: 3,
        },
        {
          soundIndex: 1,
        },
        {
          soundIndex: 0,
        },
        {
          soundIndex: 3,
        },
        {
          soundIndex: 1,
        },
        {
          soundIndex: 0,
        },
        {
          soundIndex: 1,
        },
        null,
        {
          soundIndex: 1,
        },
        null,
        {
          soundIndex: 4,
        },
        {
          soundIndex: 5,
        },
        {
          soundIndex: 1,
        },
        null,
        {
          soundIndex: 4,
        },
        {
          soundIndex: 6,
        },
        {
          soundIndex: 8,
        },
        {
          soundIndex: 9,
        },
        {
          soundIndex: 7,
        },
        {
          soundIndex: 3,
        },
        {
          soundIndex: 11,
        },
        null,
        {
          soundIndex: 4,
        },
        {
          soundIndex: 2,
        },
        {
          soundIndex: 0,
        },
        {
          soundIndex: 3,
        },
        {
          soundIndex: 7,
        },
        {
          soundIndex: 5,
        },
        {
          soundIndex: 4,
        },
        {
          soundIndex: 5,
        },
        {
          soundIndex: 1,
        },
        null,
        null,
        {
          soundIndex: 5,
        },
        {
          soundIndex: 1,
        },
        {
          soundIndex: 12,
        },
        {
          soundIndex: 10,
        },
        {
          soundIndex: 1,
        },
        {
          soundIndex: 7,
        },
        {
          soundIndex: 2,
        },
        null,
        {
          soundIndex: 1,
        },
        null,
        {
          soundIndex: 5,
        },
        {
          soundIndex: 4,
        },
        {
          soundIndex: 4,
        },
        {
          soundIndex: 7,
        },
        {
          soundIndex: 3,
        },
        {
          soundIndex: 1,
        },
        null,
        {
          soundIndex: 7,
        },
        {
          soundIndex: 4,
        },
        {
          soundIndex: 3,
        },
        null,
        {
          soundIndex: 7,
        },
        {
          soundIndex: 1,
        },
        null,
        null,
        {
          soundIndex: 1,
        },
      ],
      id: 1,
      name: "Line 1",
      totalLines: 4,
    },
    {
      cells: [
        {
          soundIndex: 1,
        },
        {
          soundIndex: 2,
        },
        null,
        null,
        {
          soundIndex: 1,
        },
        null,
        {
          soundIndex: 3,
        },
        {
          soundIndex: 1,
        },
        {
          soundIndex: 2,
        },
      ],
      id: 2,
      name: "Line 2",
      totalLines: 0,
    },
  ],
  settings: {
    cellsPerLine: 16,
    divideEvery: 2,
    sounds: "don, kon, ka, do, ko, ro, su, tsu,ku, kara, ra, doko",
  },
};
export const useSettings = () =>
  useSelector((state) => {
    const { cellsPerLine, divideEvery, sounds } = state[name].settings;
    return {
      cellsPerLine,
      divideEvery,
      sounds,
    };
  }, shallowEqual);

export const useSections = () =>
  useSelector((state) => {
    const { sections } = state[name];
    return sections;
  }, shallowEqual);

export const useSectionIds = () =>
  useSelector((state) => {
    const { sections } = state[name];
    return sections.map((s) => s.id);
  }, shallowEqual);

export const useSection = (index) =>
  useSelector((state) => {
    const { sections } = state[name];
    return sections[index];
  }, shallowEqual);

const getNewSection = (index = 0) => ({
  cells: [],
  id: index,
  name: `Line ${index}`,
  totalLines: 0,
});

export const mainSlice = createSlice({
  name,
  initialState,
  reducers: {
    // Only sets the keys provided
    setSettings: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state.settings[key] = action.payload[key];
      });
    },
    setTotalLines: (state, action) => {
      const { sectionIndex, totalLines } = action.payload;
      state.sections[sectionIndex].totalLines = Math.max(totalLines, 0);
    },
    setSoundIndex: (state, action) => {
      const { sectionIndex, cellIndex, soundIndex } = action.payload;
      const section = state.sections[sectionIndex] || getNewSection();
      const cell = section.cells[cellIndex] || {};
      cell.soundIndex = soundIndex;
      state.sections[sectionIndex].cells[cellIndex] = cell;
    },
    setMainState: (state, action) => action.payload,
    addSection: (state, action) => {
      state.sections.push(getNewSection(state.sections.length + 1));
    },
    removeLastSection: (state, action) => {
      state.sections.pop();
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCellsPerLine,
  setDivideEvery,
  setTotalLines,
  setSounds,
  setSettings,
  setSoundIndex,
  setMainState,
  addSection,
  removeLastSection,
} = mainSlice.actions;

export default mainSlice.reducer;
