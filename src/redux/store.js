import { configureStore } from "@reduxjs/toolkit";
import mainReducer, { name as mainName } from "./mainSlice";

const configureStoreOptions = {
  reducer: {
    [mainName]: mainReducer,
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
};
