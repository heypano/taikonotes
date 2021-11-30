import { configureStore } from "@reduxjs/toolkit";
import undoable from "redux-undo";
import mainReducer, { name as mainName } from "./mainSlice";
import cellReducer, { name as cellName } from "./cellSlice";
import editReducer, { name as editName } from "./editSlice";
import errorReducer, { name as errorName } from "./errorSlice";

const configureStoreOptions = {
  reducer: {
    [mainName]: undoable(mainReducer),
    [cellName]: undoable(cellReducer),
    [editName]: undoable(editReducer),
    [errorName]: undoable(errorReducer),
  },
};

export const store = configureStore(configureStoreOptions);

export const getMainState = () => store.getState()[mainName];

const localStorageKey = "taikoNotesState";

export const saveMainToLocal = () => {
  const state = getMainState();
  localStorage.setItem(localStorageKey, JSON.stringify(state));
};

export const getMainFromLocal = () => {
  const state = localStorage.getItem(localStorageKey);
  if (state) {
    return JSON.parse(state);
  }
  return null;
};
