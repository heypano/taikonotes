/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { shallowEqual, useSelector } from "react-redux";

export const name = "main";

export const initialState = {
  title: "New Song",
  slug: undefined,
  sections: [
    {
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
  ],
};
export const useSettings = (sectionIndex) =>
  useSelector(
    (state) => state[name].sections[sectionIndex].settings,
    shallowEqual
  );

export const useSoundObj = (sectionIndex) =>
  useSelector((state) => {
    if (sectionIndex !== undefined) {
      return state[name].sections[sectionIndex].settings.soundObj;
    }
    return null;
  }, shallowEqual);

export const useSections = () =>
  useSelector((state) => {
    const { sections } = state[name];
    return sections;
  }, shallowEqual);

export const useSongTitle = () =>
  useSelector((state) => {
    const { title } = state[name];
    return title;
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

export const useSectionComment = (index) =>
  useSelector((state) => {
    const { sections } = state[name];
    if (index !== undefined) {
      return sections?.[index]?.comment;
    }
    return null;
  }, shallowEqual);

export const useCell = (sectionIndex, cellIndex) =>
  useSelector((state) => {
    const { sections } = state[name];
    return sections[sectionIndex]?.cells[cellIndex] || {};
  }, shallowEqual);

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
      state.sections = [getNewSection()];
    },
    setSongTitle: (state, action) => {
      state.title = action.payload;
    },
    setSettings: (state, action) => {
      const { sectionId, settings } = action.payload;
      Object.keys(settings).forEach((key) => {
        state.sections[sectionId].settings[key] = settings[key];
      });
      state.sections[sectionId].settings.soundObj = Object.fromEntries(
        `,${state.sections[sectionId].settings.sounds}`
          .split(",")
          .map((s) => [s.trim(), s.trim()])
      );
      // Erase sounds that don't match
      // state.sections.forEach((section) => {
      //   section.cells.forEach((cell) => {
      //     if (cell) {
      //       cell.sound = state.settings.soundObj[cell.sound] ? cell.sound : "";
      //     }
      //   });
      // });
    },
    setTotalLines: (state, action) => {
      const { sectionIndex, totalLines } = action.payload;
      const final = Math.max(totalLines, 1);
      const { cellsPerLine } = state.sections[sectionIndex].settings;
      state.sections[sectionIndex].totalLines = final;
      state.sections[sectionIndex].cells = state.sections[
        sectionIndex
      ].cells.slice(0, final * cellsPerLine);
    },
    setSectionName: (state, action) => {
      const { sectionIndex, sectionName } = action.payload;
      state.sections[sectionIndex].sectionName = sectionName;
    },
    setSectionComment: (state, action) => {
      const { sectionIndex, comment } = action.payload;
      state.sections[sectionIndex].comment = comment;
    },
    setSound: (state, action) => {
      const { sectionIndex, cellIndex, sound } = action.payload;
      const section = state.sections[sectionIndex];
      const cell = section.cells[cellIndex] || {};
      cell.sound = sound;
      state.sections[sectionIndex].cells[cellIndex] = cell;
    },
    setCellComment: (state, action) => {
      const { sectionIndex, cellIndex, comment } = action.payload;
      const section = state.sections[sectionIndex];
      const cell = section.cells[cellIndex] || {};
      cell.comment = comment;
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
  setSongTitle,
  setTotalLines,
  setSectionName,
  setSectionComment,
  setSounds,
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
