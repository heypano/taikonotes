import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useState } from "react";

export const name = "main";

const initialState = {
  sections: [
    {
      name: "Line A",
      totalLines: 3,
      cells: [
        {
          soundIndex: 2,
        },
        null,
        {
          soundIndex: 2,
        },
        null,
        {
          soundIndex: 1,
        },
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
    },
    {
      name: "Line B",
      totalLines: 3,
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
    },
  ],
  settings: {
    cellsPerLine: 16,
    divideEvery: 4,
    totalLines: 4,
    sounds: "don, kon, ka, su, doko, kara",
  },
};

export const useSettings = () => {
  return useSelector((state) => {
    const { cellsPerLine, divideEvery, sounds } = state[name].settings;
    return {
      cellsPerLine,
      divideEvery,
      sounds,
    };
  });
};

export const useSections = () => {
  return useSelector((state) => {
    const { sections } = state[name];
    return sections;
  });
};

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
      const section = state.sections[sectionIndex] || {
        cells: [],
      };
      const cell = section.cells[cellIndex] || {};
      cell.soundIndex = soundIndex;
      state.sections[sectionIndex].cells[cellIndex] = cell;
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
} = mainSlice.actions;

export default mainSlice.reducer;
