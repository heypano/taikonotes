import React, { memo } from "react";
import { useDispatch } from "react-redux";
import {
  addSection,
  clearState,
  removeLastSection,
  setMainState,
  setSongTitle,
  useSongTitle,
} from "../redux/mainSlice";
import { getMainFromLocal, saveMainToLocal } from "../redux/store";
import HeaderButton from "./HeaderButton";

const Header = () => {
  const dispatch = useDispatch();
  const title = useSongTitle();
  return (
    <div className="settings p-1 mt-3 mb-3 flex flex-col md:flex-row">
      <div className="w-full md:w-8/12 lg:w-6/12 grid logoGrid mr-3">
        <img
          src={`${process.env.PUBLIC_URL}/favicon/Taiko.svg`}
          className="w-full p-2"
          alt="taiko logo"
        />
        <textarea
          className="text-2xl w-full outline-none p-2 resize-none"
          value={title}
          onChange={(e) => {
            dispatch(setSongTitle(e.target.value));
          }}
        />
      </div>
      <div className="w-full md:w-4/12 lg:w-6/12 flex flex-col justify-between">
        <div className="mt-2 md:mt-0 grid grid-rows-2 grid-flow-col gap-1">
          <HeaderButton
            onClick={() => {
              dispatch(addSection());
            }}
          >
            Add Section
          </HeaderButton>
          <HeaderButton
            onClick={() => {
              dispatch(removeLastSection());
            }}
          >
            Remove Last Section
          </HeaderButton>
          <HeaderButton
            onClick={() => {
              saveMainToLocal();
            }}
          >
            Save
          </HeaderButton>
          <HeaderButton
            onClick={() => {
              const state = getMainFromLocal();
              console.debug("entire state", state);
              dispatch(setMainState(state));
            }}
          >
            Load
          </HeaderButton>
          <HeaderButton
            onClick={() => {
              dispatch(clearState());
            }}
          >
            Clear
          </HeaderButton>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default memo(Header);
