import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import TaikoLogo from "../public/favicon/Taiko.svg";
import {
  addSection,
  clearState,
  removeLastSection,
  setSongTitle,
  useSongTitle,
} from "../redux/mainSlice";
import { getMainState } from "../redux/store";
import HeaderButton from "./HeaderButton";
import Pencil from "./Icons/Pencil";
import Icon from "./Icons/Icon";
import { setIsEditing, useIsEditing } from "../redux/editSlice";
import { post } from "../lib/api";
import Spin from "./Icons/Spin";
import { useError } from "../redux/errorSlice";

const Header = () => {
  const dispatch = useDispatch();
  const title = useSongTitle();
  const isEditing = useIsEditing();
  const error = useError();
  const { query } = useRouter();
  const { songslug } = query;
  const [isSaving, setIsSaving] = useState(false);
  return (
    <div className="settings p-1 mb-3 flex flex-col md:flex-row">
      <div className="w-full md:w-8/12 lg:w-6/12 grid logoGrid mr-3">
        <Image src={TaikoLogo} className="w-full p-2" alt="taiko logo" />
        {isEditing ? (
          <label htmlFor="songname">
            <textarea
              id="songname"
              aria-label="song name"
              className="text-2xl w-full outline-none p-2 resize-none"
              value={title}
              onChange={(e) => {
                dispatch(setSongTitle(e.target.value));
              }}
            />
          </label>
        ) : (
          <div className="text-2xl w-full p-2">{title}</div>
        )}
      </div>
      <div className="w-full md:w-4/12 lg:w-6/12 flex flex-col justify-between">
        <div className="mt-2 md:mt-0 grid grid-rows-2 grid-cols-3 grid-flow-col gap-1">
          {isEditing && (
            <>
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
                onClick={async () => {
                  setIsSaving(true);
                  const state = {
                    ...getMainState(),
                    slug: songslug,
                  };
                  await post(`/api/saveSong/${songslug}`, state);
                  setIsSaving(false);
                }}
              >
                Save
                {isSaving && (
                  <div className="w-6">
                    <Spin />
                  </div>
                )}
              </HeaderButton>
              <HeaderButton
                onClick={() => {
                  dispatch(clearState());
                }}
              >
                Clear
              </HeaderButton>
            </>
          )}
          <HeaderButton
            onClick={() => {
              dispatch(setIsEditing(!isEditing));
            }}
            className={isEditing ? "bg-blue-50" : "bg-red-50"}
          >
            Toggle Edit
            <Icon className="w-8">
              <Pencil />
            </Icon>
          </HeaderButton>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default memo(Header);
