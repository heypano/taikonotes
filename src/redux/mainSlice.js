import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useState } from "react";

export const name = "main";

const initialState = {
  settings: {
    cellsPerLine: 16,
    divideEvery: 4,
    totalLines: 4,
    sounds: "don, kon, ka, su, doko, kara",
  },
};

export const useSettings = () => {
  return useSelector((state) => {
    const { cellsPerLine, divideEvery, totalLines, sounds } = state[
      name
    ].settings;
    return {
      cellsPerLine,
      divideEvery,
      totalLines,
      sounds,
    };
  });
};

export const mainSlice = createSlice({
  name,
  initialState,
  reducers: {
    setSettings: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state.settings[key] = action.payload[key];
      });
    },
    setCellsPerLine: (state, action) => {
      state.settings.cellsPerLine = action.payload;
    },
    setDivideEvery: (state, action) => {
      state.settings.divideEvery = action.payload;
    },
    setTotalLines: (state, action) => {
      state.settings.totalLines = action.payload;
    },
    setSounds: (state, action) => {
      state.settings.sounds = action.payload;
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
} = mainSlice.actions;

export default mainSlice.reducer;
