/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { shallowEqual, useSelector } from "react-redux";

export const name = "main";

export const initialState = {
  title: "New Song",
  slug: undefined,
  sections: [1, 1, 1],
  sectionsMap: {
    1: {
      cells: [],
      id: 1,
      sectionName: "New Section",
      totalLines: 4,
      settings: {
        cellsPerLine: 16,
        divideEvery: 4,
        sounds: "don, kon, ka, do, ko, ro, su, tsu,ku, kara, ra, doko",
        soundObj: {
          "": "",
          don: "don",
          kon: "kon",
          ka: "ka",
          do: "do",
          ko: "ko",
          ro: "ro",
          su: "su",
          tsu: "tsu",
          ku: "ku",
          kara: "kara",
          ra: "ra",
          doko: "doko",
        },
      },
    },
  },
};
export const useSettings = (sectionId) =>
  useSelector(
    (state) => state[name]?.sectionsMap?.[sectionId]?.settings || {},
    shallowEqual
  );

export const useSoundObj = (sectionId) =>
  useSelector((state) => {
    if (sectionId !== undefined) {
      return state[name]?.sectionsMap?.[sectionId]?.settings?.soundObj;
    }
    return null;
  }, shallowEqual);

export const useSongTitle = () =>
  useSelector((state) => {
    const { title } = state[name];
    return title;
  }, shallowEqual);

export const useSectionList = () =>
  useSelector((state) => {
    const { sections } = state[name];
    return sections;
  }, shallowEqual);

export const useSectionNoCells = (sectionId) =>
  useSelector((state) => {
    const { sectionsMap } = state[name];
    const section = {
      ...sectionsMap[sectionId],
    };
    delete section.cells;
    return section;
  }, shallowEqual);

export const useSectionComment = (sectionId) =>
  useSelector((state) => {
    if (sectionId !== undefined) {
      return state[name]?.sectionsMap?.[sectionId]?.comment;
    }
    return null;
  }, shallowEqual);

export const useCell = (sectionId, cellIndex) =>
  useSelector(
    (state) => state[name]?.sectionsMap?.[sectionId]?.cells?.[cellIndex] || {},
    shallowEqual
  );

const getNewSection = (index = 0) => ({
  cells: [],
  id: index,
  sectionName: `Line ${index}`,
  totalLines: 1,
  settings: {
    cellsPerLine: 4,
    divideEvery: 2,
    sounds: "don, kon, ka",
    soundObj: {
      "": "",
      don: "don",
      kon: "kon",
      ka: "ka",
    },
  },
});

export const mainSlice = createSlice({
  name,
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.sections = [1];
      state.sectionsMap = {
        1: getNewSection(),
      };
    },
    setSongTitle: (state, action) => {
      state.title = action.payload;
    },
    setSettings: (state, action) => {
      const { sectionId, settings } = action.payload;
      Object.keys(settings).forEach((key) => {
        state.sectionsMap[sectionId].settings[key] = settings[key];
      });
      state.sectionsMap[sectionId].settings.soundObj = Object.fromEntries(
        `,${state.sectionsMap[sectionId].settings.sounds}`
          .split(",")
          .map((s) => [s.trim(), s.trim()])
      );
    },
    setTotalLines: (state, action) => {
      const { sectionId, totalLines } = action.payload;
      const final = Math.max(totalLines, 1);
      const { cellsPerLine } = state.sectionsMap[sectionId].settings;
      state.sectionsMap[sectionId].totalLines = final;
      state.sectionsMap[sectionId].cells = state.sectionsMap[
        sectionId
      ].cells.slice(0, final * cellsPerLine);
    },
    setSectionName: (state, action) => {
      const { sectionId, sectionName } = action.payload;
      state.sectionsMap[sectionId].sectionName = sectionName;
    },
    setSectionComment: (state, action) => {
      const { sectionId, comment } = action.payload;
      state.sectionsMap[sectionId].comment = comment;
    },
    setSound: (state, action) => {
      const { sectionId, cellIndex, sound } = action.payload;
      const section = state.sectionsMap[sectionId];
      const cell = section.cells[cellIndex] || {};
      cell.sound = sound;
      state.sectionsMap[sectionId].cells[cellIndex] = cell;
    },
    setCellComment: (state, action) => {
      const { sectionId, cellIndex, comment } = action.payload;
      const section = state.sectionsMap[sectionId];
      const cell = section.cells[cellIndex] || {};
      cell.comment = comment;
      state.sectionsMap[sectionId].cells[cellIndex] = cell;
    },
    setIntensity: (state, action) => {
      const { sectionId, cellIndex, intensity } = action.payload;
      const section = state.sectionsMap[sectionId];
      const cell = section.cells[cellIndex] || {};
      cell.intensity = intensity;
      state.sectionsMap[sectionId].cells[cellIndex] = cell;
    },
    setMainState: (state, action) => action.payload,
    addSection: (state, action) => {
      state.sections.push(1);
    },
    removeLastSection: (state, action) => {
      state.sections.pop();
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSongTitle,
  setTotalLines,
  setSectionName,
  setSectionComment,
  setSettings,
  setSound,
  setCellComment,
  setIntensity,
  setMainState,
  addSection,
  removeLastSection,
  clearState,
} = mainSlice.actions;

export default mainSlice.reducer;
