/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { shallowEqual, useSelector } from "react-redux";
import { getCurrentState } from "./mainSlice";

export const name = "error";

export const initialState = {
  error: undefined,
  notificationMessage: undefined,
  notificationType: undefined,
  updateFlag: false,
};

export const useError = () =>
  useSelector((state) => {
    const { error } = getCurrentState(state, name);
    return error;
  }, shallowEqual);

export const useNotification = () =>
  useSelector(
    (state) => {
      const {
        notificationType,
        notificationMessage,
        updateFlag,
      } = getCurrentState(state, name);
      return { notificationType, notificationMessage, updateFlag };
    },
    () => false
  );

export const errorSlice = createSlice({
  name,
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
    setNotification: (state, action) => {
      const { type, message } = action.payload;
      state.notificationType = type;
      state.notificationMessage = message;
      state.updateFlag = !state.updateFlag;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setError, setNotification } = errorSlice.actions;

export default errorSlice.reducer;
