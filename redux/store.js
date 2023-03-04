import { configureStore } from "@reduxjs/toolkit";
import undoable from "redux-undo";
import mainReducer, { name as mainName } from "./mainSlice";
import cellPopupReducer, { name as cellPopupName } from "./cellPopupSlice";
import editReducer, { name as editName } from "./editSlice";
import errorReducer, { name as errorName } from "./errorSlice";

const configureStoreOptions = {
  reducer: {
    [mainName]: undoable(mainReducer),
    [cellPopupName]: cellPopupReducer,
    [editName]: editReducer,
    [errorName]: errorReducer,
  },
};

export const store = configureStore(configureStoreOptions);

export const getMainState = (config = {}) => {
  const { trim } = config;
  const main = store.getState()[mainName];
  const result = {
    ...main,
  };
  if (trim) {
    result.past = [];
    result.present = { ...result.present, isDirty: false };
  }
  return result;
};

if (typeof window !== "undefined") {
  window.getMainState = getMainState;
}

const localStorageKey = "taikoNotesState";

export const saveMainToLocal = () => {
  const state = getMainState({ trim: true });
  localStorage.setItem(localStorageKey, JSON.stringify(state));
};

export const getMainFromLocal = () => {
  const state = localStorage.getItem(localStorageKey);
  if (state) {
    return JSON.parse(state);
  }
  return null;
};
