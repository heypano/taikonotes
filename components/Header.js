import { memo, useCallback, useEffect, useRef, useState } from "react";
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
import SaveDialog from "./SaveDialog";

const Header = () => {
  const dispatch = useDispatch();
  const title = useSongTitle();
  const isEditing = useIsEditing();
  const { query, push } = useRouter();
  const { songslug } = query;
  const [isSaving, setIsSaving] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [dialogLeft, setDialogLeft] = useState(0);
  const [dialogTop, setDialogTop] = useState(0);
  const [saveError, setSaveError] = useState();
  const buttonRef = useRef();
  useEffect(() => {
    const { x, y } = buttonRef.current.getBoundingClientRect();
    setDialogLeft(x);
    setDialogTop(y);
  }, [saveDialogOpen]);

  const saveMethod = useCallback(
    async ({ password, songslug: inputSongSlug }) => {
      setIsSaving(true);
      const slug = inputSongSlug || songslug;
      const saveData = {
        ...getMainState(),
        slug,
        password,
      };
      const { error } = await post(`/api/saveSong/${slug}`, saveData);
      setSaveError(error);
      setIsSaving(false);
      if (!error) {
        setSaveDialogOpen(false);
        if (inputSongSlug) {
          await push(`/${inputSongSlug}`);
        }
      }
    },
    [push, songslug]
  );

  return (
    <div className="settings p-1 mb-3 flex flex-col md:flex-row">
      <div className="w-full md:w-8/12 lg:w-6/12 grid logoGrid mr-3">
        {saveDialogOpen && (
          <SaveDialog
            left={dialogLeft}
            top={dialogTop}
            open={saveDialogOpen}
            onOpenChange={(open) => {
              setSaveDialogOpen(open);
            }}
            className="max-w-sm p-4"
            saveMethod={saveMethod}
            isSaving={isSaving}
            songslug={songslug}
            error={saveError}
          />
        )}
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
                onClick={() => {
                  setSaveDialogOpen(true);
                }}
                ref={buttonRef}
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
