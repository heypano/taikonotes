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
          intensity: 1,
        },
        {
          soundIndex: 1,
        },
        {
          soundIndex: 0,
        },
        {
          soundIndex: 3,
          intensity: 1,
        },
        {
          soundIndex: 1,
        },
        {
          soundIndex: 0,
        },
        {
          soundIndex: 1,
          intensity: 1,
        },
        null,
        {
          soundIndex: 1,
          intensity: 1,
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
          intensity: 1,
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
          intensity: 1,
        },
        {
          soundIndex: 11,
          intensity: 1,
        },
        null,
        {
          soundIndex: 4,
        },
        {
          soundIndex: 2,
          intensity: 1,
        },
        {
          soundIndex: 0,
        },
        {
          soundIndex: 3,
          intensity: 1,
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
          intensity: 1,
        },
        null,
        null,
        {
          soundIndex: 5,
        },
        {
          soundIndex: 1,
          intensity: 1,
        },
        {
          soundIndex: 12,
        },
        {
          soundIndex: 10,
          intensity: 1,
        },
        {
          soundIndex: 1,
          intensity: 1,
        },
        {
          soundIndex: 7,
        },
        {
          soundIndex: 2,
          intensity: 1,
        },
        null,
        {
          soundIndex: 1,
          intensity: 1,
        },
        null,
        {
          soundIndex: 5,
        },
        {
          soundIndex: 4,
          intensity: 1,
        },
        {
          soundIndex: 4,
          intensity: 1,
        },
        {
          soundIndex: 7,
        },
        {
          soundIndex: 3,
          intensity: 1,
        },
        {
          soundIndex: 1,
          intensity: 1,
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
          intensity: 1,
        },
        null,
        {
          soundIndex: 7,
        },
        {
          soundIndex: 1,
          intensity: 1,
        },
        null,
        null,
        {
          soundIndex: 1,
          intensity: 1,
        },
      ],
      id: 1,
      sectionName: "Line 1",
      totalLines: 4,
    },
    {
      cells: [],
      id: 2,
      sectionName: "Line 2",
      totalLines: 1,
    },
  ],
  settings: {
    cellsPerLine: 16,
    divideEvery: 2,
    sounds: "don, kon, ka, do, ko, ro, su, tsu,ku, kara, ra, doko",
  },
};
export const useSettings = () =>
  useSelector((state) => state[name].settings, shallowEqual);

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

export const useSectionNoCells = (index) =>
  useSelector((state) => {
    const { sections } = state[name];
    const section = {
      ...sections[index],
    };
    delete section.cells;
    return section;
  }, shallowEqual);

export const useCell = (sectionIndex, cellIndex) =>
  useSelector((state) => {
    const { sections } = state[name];
    return sections[sectionIndex].cells[cellIndex] || {};
  }, shallowEqual);

const getNewSection = (index = 0) => ({
  cells: [],
  id: index,
  name: `Line ${index}`,
  totalLines: 1,
});

export const mainSlice = createSlice({
  name,
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.sections = [getNewSection()];
    },
    setSettings: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state.settings[key] = action.payload[key];
      });
    },
    setTotalLines: (state, action) => {
      const { sectionIndex, totalLines } = action.payload;
      const final = Math.max(totalLines, 1);
      const { cellsPerLine } = state.settings;
      state.sections[sectionIndex].totalLines = final;
      state.sections[sectionIndex].cells = state.sections[
        sectionIndex
      ].cells.slice(0, final * cellsPerLine);
    },
    setSectionName: (state, action) => {
      const { sectionIndex, sectionName } = action.payload;
      state.sections[sectionIndex].sectionName = sectionName;
    },
    setSoundIndex: (state, action) => {
      const { sectionIndex, cellIndex, soundIndex } = action.payload;
      const section = state.sections[sectionIndex];
      const cell = section.cells[cellIndex] || {};
      cell.soundIndex = soundIndex;
      state.sections[sectionIndex].cells[cellIndex] = cell;
    },
    setIntensity: (state, action) => {
      const { sectionIndex, cellIndex, intensity } = action.payload;
      const section = state.sections[sectionIndex];
      const cell = section.cells[cellIndex] || {};
      cell.intensity = intensity;
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
  setSectionName,
  setSounds,
  setSettings,
  setSoundIndex,
  setIntensity,
  setMainState,
  addSection,
  removeLastSection,
  clearState,
} = mainSlice.actions;

export default mainSlice.reducer;
