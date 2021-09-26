import React from "react";
import { useDispatch } from "react-redux";
import TaikoGridSettings from "./TaikoGridSettings";
import Button from "./Button";
import {
  addSection,
  clearState,
  removeLastSection,
  setMainState,
} from "../redux/mainSlice";
import { getMainFromLocal, saveMainToLocal } from "../redux/store";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <div className="settings p-1 mt-3 mb-3 flex flex-col md:flex-row">
      <div className="w-full md:w-8/12 lg:w-6/12 grid logoGrid mr-3">
        <img
          src={`${process.env.PUBLIC_URL}/favicon/Taiko.svg`}
          className="w-full p-2"
          alt="taiko logo"
        />
        <TaikoGridSettings />
      </div>
      <div className="w-full md:w-4/12 lg:w-6/12 flex flex-col justify-between">
        <div className="mt-2 md:mt-0 grid grid-rows-2 grid-flow-col gap-1">
          <Button
            onClick={() => {
              dispatch(addSection());
            }}
          >
            Add Section
          </Button>
          <Button
            onClick={() => {
              dispatch(removeLastSection());
            }}
          >
            Remove Last Section
          </Button>
          <Button
            onClick={() => {
              saveMainToLocal();
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              const state = getMainFromLocal();
              console.debug("entire state", state);
              dispatch(setMainState(state));
            }}
          >
            Load
          </Button>
          <Button
            onClick={() => {
              dispatch(clearState());
            }}
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
