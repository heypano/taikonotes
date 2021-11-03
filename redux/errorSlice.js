/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { shallowEqual, useSelector } from "react-redux";

export const name = "error";

export const initialState = {
  error: undefined,
};

export const useError = () =>
  useSelector((state) => {
    const { error } = state[name];
    return error;
  }, shallowEqual);

export const errorSlice = createSlice({
  name,
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
