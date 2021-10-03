/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { shallowEqual, useSelector } from "react-redux";

export const name = "cell";

export const initialState = {
  open: false,
  menuCoordinates: undefined,
  cellIndex: undefined,
  sectionIndex: undefined,
};

export const useCellPopupOpen = () =>
  useSelector((state) => {
    const { open } = state[name];
    return open;
  }, shallowEqual);

export const useCellMenuCoordinates = () =>
  useSelector((state) => {
    const { menuCoordinates } = state[name];
    return menuCoordinates;
  }, shallowEqual);

export const useCellIndex = () =>
  useSelector((state) => {
    const { cellIndex } = state[name];
    return cellIndex;
  }, shallowEqual);

export const useCellSectionIndex = () =>
  useSelector((state) => {
    const { sectionIndex } = state[name];
    return sectionIndex;
  }, shallowEqual);

export const cellSlice = createSlice({
  name,
  initialState,
  reducers: {
    setCellPopupState: (state, action) => {
      const { sectionIndex, cellIndex, menuCoordinates, open } = action.payload;
      return { ...state, sectionIndex, cellIndex, menuCoordinates, open };
    },
    setCellPopupOpen: (state, action) => {
      state.open = action.payload;
    },
    setCellPopupMenuCoordinates: (state, action) => {
      state.menuCoordinates = action.payload;
    },
    setCellPopupCellIndex: (state, action) => {
      state.cellIndex = action.payload;
    },
    setCellPopupSectionIndex: (state, action) => {
      state.sectionIndex = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCellPopupOpen,
  setCellPopupMenuCoordinates,
  setCellPopupCellIndex,
  setCellPopupSectionIndex,
  setCellPopupState,
} = cellSlice.actions;

export default cellSlice.reducer;
