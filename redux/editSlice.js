/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { shallowEqual, useSelector } from "react-redux";
import { setMainState } from "./mainSlice";

export const name = "edit";

export const initialState = {
  isLoading: true,
  isEditing: true,
  sectionCommentOpen: false,
  sectionCommentCoordinates: null,
  sectionCommentSectionId: null,
  sectionSettingOpen: false,
  sectionSettingSectionId: null,
  sectionSettingCoordinates: null,
};

export const useIsEditing = () => useSelector((state) => state[name].isEditing);
export const useIsLoading = () => useSelector((state) => state[name].isLoading);

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

export const useSectionSettingData = () =>
  useSelector((state) => {
    const {
      sectionSettingOpen,
      sectionSettingSectionId,
      sectionSettingCoordinates,
    } = state[name];
    return {
      sectionSettingOpen,
      sectionSettingSectionId,
      sectionSettingCoordinates,
    };
  }, shallowEqual);

export const editSlice = createSlice({
  name,
  initialState,
  reducers: {
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSectionCommentOpen: (state, action) => {
      state.sectionCommentOpen = action.payload;
    },
    setSectionSettingOpen: (state, action) => {
      state.sectionSettingOpen = action.payload;
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
    setSectionSettingData: (state, action) => {
      const {
        sectionSettingOpen,
        sectionSettingSectionId,
        sectionSettingCoordinates,
      } = action.payload;
      return {
        ...state,
        sectionSettingOpen,
        sectionSettingSectionId,
        sectionSettingCoordinates,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setMainState, (state, action) => {
      state.isLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  setIsEditing,
  setIsLoading,
  setSectionCommentOpen,
  setSectionCommentData,
  setSectionSettingOpen,
  setSectionSettingData,
} = editSlice.actions;

export default editSlice.reducer;
