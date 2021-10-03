/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { shallowEqual, useSelector } from "react-redux";

export const name = "edit";

export const initialState = {
  isEditing: true,
  sectionCommentOpen: false,
  sectionCommentCoordinates: null,
  sectionCommentSectionId: null,
};
export const useIsEditing = () => useSelector((state) => state[name].isEditing);

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
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
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
  setIsEditing,
  setSectionCommentOpen,
  setSectionCommentData,
} = editSlice.actions;

export default editSlice.reducer;
