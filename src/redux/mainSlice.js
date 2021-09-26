/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { shallowEqual, useSelector } from "react-redux";

export const name = "main";

export const initialState = {
  sections: [
    {
      cells: [
        {
          sound: "don",
        },
        null,
        {
          sound: "ka",
          intensity: 1,
        },
        {
          sound: "don",
        },
        {
          sound: "",
        },
        {
          sound: "ka",
          intensity: 1,
        },
        {
          sound: "don",
        },
        {
          sound: "",
        },
        {
          sound: "don",
          intensity: 1,
        },
        null,
        {
          sound: "don",
          intensity: 1,
        },
        null,
        {
          sound: "do",
        },
        {
          sound: "ko",
        },
        {
          sound: "don",
          intensity: 1,
        },
        null,
        {
          sound: "do",
        },
        {
          sound: "ro",
        },
        {
          sound: "tsu",
        },
        {
          sound: "ku",
        },
        {
          sound: "su",
        },
        {
          sound: "ka",
          intensity: 1,
        },
        {
          sound: "ra",
          intensity: 1,
        },
        null,
        {
          sound: "do",
        },
        {
          sound: "kon",
          intensity: 1,
        },
        {
          sound: "",
        },
        {
          sound: "ka",
          intensity: 1,
        },
        {
          sound: "su",
        },
        {
          sound: "ko",
        },
        {
          sound: "do",
        },
        {
          sound: "ko",
        },
        {
          sound: "don",
          intensity: 1,
        },
        null,
        null,
        {
          sound: "ko",
        },
        {
          sound: "don",
          intensity: 1,
        },
        {
          sound: "doko",
        },
        {
          sound: "kara",
          intensity: 1,
        },
        {
          sound: "don",
          intensity: 1,
        },
        {
          sound: "su",
        },
        {
          sound: "kon",
          intensity: 1,
        },
        null,
        {
          sound: "don",
          intensity: 1,
        },
        null,
        {
          sound: "ko",
        },
        {
          sound: "do",
          intensity: 1,
        },
        {
          sound: "do",
          intensity: 1,
        },
        {
          sound: "su",
        },
        {
          sound: "ka",
          intensity: 1,
        },
        {
          sound: "don",
          intensity: 1,
        },
        null,
        {
          sound: "su",
        },
        {
          sound: "do",
        },
        {
          sound: "ka",
          intensity: 1,
        },
        null,
        {
          sound: "su",
        },
        {
          sound: "don",
          intensity: 1,
        },
        null,
        null,
        {
          sound: "don",
          intensity: 1,
        },
      ],
      id: 1,
      sectionName: "Line 1",
      totalLines: 4,
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
  sectionName: `Line ${index}`,
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
    setSound: (state, action) => {
      const { sectionIndex, cellIndex, sound } = action.payload;
      const section = state.sections[sectionIndex];
      const cell = section.cells[cellIndex] || {};
      cell.sound = sound;
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
  setSound,
  setIntensity,
  setMainState,
  addSection,
  removeLastSection,
  clearState,
} = mainSlice.actions;

export default mainSlice.reducer;
