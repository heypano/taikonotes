import { configureStore } from "@reduxjs/toolkit";
import mainReducer, { name as mainName } from "./mainSlice";

const configureStoreOptions = {
  reducer: {
    [mainName]: mainReducer,
  },
};

export const store = configureStore(configureStoreOptions);
