import { configureStore } from "@reduxjs/toolkit";
import mainReducer, { name as mainName } from "./mainSlice";
import cellReducer, { name as cellName } from "./cellSlice";

const configureStoreOptions = {
  reducer: {
    [mainName]: mainReducer,
    [cellName]: cellReducer,
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
