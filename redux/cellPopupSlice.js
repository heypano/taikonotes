/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { shallowEqual, useSelector } from "react-redux";
import { getCurrentState } from "./mainSlice";

export const name = "cellPopup";

export const initialState = {
  open: false,
  menuCoordinates: undefined,
  cellIndex: undefined,
  sectionId: undefined,
};

export const useCellPopupOpen = () =>
  useSelector((state) => {
    const { open } = getCurrentState(state, name);
    return open;
  }, shallowEqual);

export const useCellMenuCoordinates = () =>
  useSelector((state) => {
    const { menuCoordinates } = getCurrentState(state, name);
    return menuCoordinates;
  }, shallowEqual);

export const useCellIndex = () =>
  useSelector((state) => {
    const { cellIndex } = getCurrentState(state, name);
    return cellIndex;
  }, shallowEqual);

export const useCellSectionId = () =>
  useSelector((state) => {
    const { sectionId } = getCurrentState(state, name);
    return sectionId;
  }, shallowEqual);

export const cellPopupSlice = createSlice({
  name,
  initialState,
  reducers: {
    setCellPopupState: (state, action) => {
      const { sectionId, cellIndex, menuCoordinates, open } = action.payload;
      return { ...state, sectionId, cellIndex, menuCoordinates, open };
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
    setCellPopupsectionId: (state, action) => {
      state.sectionId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCellPopupOpen,
  setCellPopupMenuCoordinates,
  setCellPopupCellIndex,
  setCellPopupsectionId,
  setCellPopupState,
} = cellPopupSlice.actions;

export default cellPopupSlice.reducer;
