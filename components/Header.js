import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";
import { ActionCreators } from "redux-undo";
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
import Notification from "./Notification";
import { setNotification } from "../redux/errorSlice";
import Taiko from "./Icons/Taiko";

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
    const { x, y } = buttonRef?.current?.getBoundingClientRect() || {};
    setDialogLeft(x);
    setDialogTop(y);
  }, [saveDialogOpen]);

  const saveMethod = useCallback(
    async ({ password, inputSongSlug, isNew }) => {
      setIsSaving(true);
      const slug = isNew ? inputSongSlug : songslug;
      const saveData = {
        ...getMainState(),
        slug,
        password,
        isNew,
      };
      const { error } = await post(`/api/saveSong/${slug}`, saveData);
      setSaveError(error);
      setIsSaving(false);
      if (!error) {
        setSaveDialogOpen(false);
        dispatch(
          setNotification({
            message: `Song saved successfully at /${slug}`,
          })
        );

        if (isNew) {
          await push(`/${inputSongSlug}`);
        }
      }
    },
    [dispatch, push, songslug]
  );

  return (
    <div className="px-1 lg:px-0 py-3 flex flex-col md:flex-row justify-between items-stretch flex-wrap">
      {/*  Logo + title */}
      <div className="w-full lg:w-6/12 flex items-stretch">
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
        <div className="mr-4 h-32 lg:h-48 ">
          {/* <img src="/favicon/Taiko.svg" alt="taiko logo" className="h-full" /> */}
          <Taiko />
        </div>
        {isEditing ? (
          <textarea
            id="songname"
            aria-label="song name"
            className="text-2xl outline-none p-2 resize-none filter shadow-texty flex-1"
            value={title}
            onChange={(e) => {
              dispatch(setSongTitle(e.target.value));
            }}
          />
        ) : (
          <div className="text-4xl outline-none resize-none flex-1">
            {title}
          </div>
        )}
      </div>
      {/*  Buttons + Notification Area */}
      <div className="w-full lg:w-6/12 flex flex-col justify-start lg:pl-3 mt-4 lg:mt-0 items-stretch lg:items-end">
        {/*  Buttons */}
        <div className="mt-2 md:mt-0 flex align-start justify-between lg:justify-start flex-wrap w-100">
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
                  dispatch(ActionCreators.undo());
                }}
              >
                Undo
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
            className={isEditing ? "" : "ml-auto"}
          >
            {isEditing ? (
              "View Mode"
            ) : (
              <>
                Edit Mode
                <Icon className="w-8">
                  <Pencil />
                </Icon>
              </>
            )}
          </HeaderButton>
        </div>
        <Notification />
      </div>
    </div>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default memo(Header);
