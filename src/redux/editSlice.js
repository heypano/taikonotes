/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { shallowEqual, useSelector } from "react-redux";

export const name = "edit";

export const initialState = {
  sectionCommentOpen: false,
  sectionCommentCoordinates: null,
  sectionCommentSectionId: null,
};

export const useSectionCommentData = () =>
  useSelector((state) => {
    const {
      sectionCommentOpen,
      sectionCommentSectionId,
      sectionCommentCoordinates,
    } = state[name];
    return {
      sectionCommentOpen,
      sectionCommentSectionId,
      sectionCommentCoordinates,
    };
  }, shallowEqual);

export const editSlice = createSlice({
  name,
  initialState,
  reducers: {
    setSectionCommentOpen: (state, action) => {
      state.sectionCommentOpen = action.payload;
    },
    setSectionCommentData: (state, action) => {
      const {
        sectionCommentOpen,
        sectionCommentSectionId,
        sectionCommentCoordinates,
      } = action.payload;
      return {
        ...state,
        sectionCommentOpen,
        sectionCommentSectionId,
        sectionCommentCoordinates,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSectionCommentOpen,
  setSectionCommentData,
} = editSlice.actions;

export default editSlice.reducer;
