import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ActionCreators } from "redux-undo";
import {
  addSection,
  clearState,
  setIsDirty,
  setSongTitle,
  useHistoryIndex,
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
import Eye from "./Icons/Eye";

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
  const historyIndex = useHistoryIndex();
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
        ...getMainState({ trim: true }),
        slug,
        password,
        isNew,
      };
      let error;
      const response = await post(`/api/saveSong/${slug}`, saveData);
      const { acknowledged } = response;
      if (!acknowledged) {
        error = response.toString(); // this is for the 413 (Body exceeded 1mb limit) case
      } else {
        error = response.error;
      }
      setSaveError(error);
      setIsSaving(false);
      if (!error) {
        setSaveDialogOpen(false);
        dispatch(
          setNotification({
            message: `Song saved successfully at /${slug}`,
          })
        );
        dispatch(setIsDirty({ isDirty: false }));
        if (isNew) {
          await push(`/${inputSongSlug}`);
        }
      }
    },
    [dispatch, push, songslug]
  );
  const onOpenChange = useCallback((open) => {
    setSaveDialogOpen(open);
  }, []);

  return (
    <div className="px-1 lg:px-0 py-3 flex flex-col md:flex-row justify-between items-stretch flex-wrap">
      {/*  Logo + title */}
      <div className="w-full lg:w-6/12 flex items-stretch">
        <SaveDialog
          left={dialogLeft}
          top={dialogTop}
          open={saveDialogOpen}
          onOpenChange={onOpenChange}
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
      <div className="w-full lg:w-6/12 flex flex-col justify-start lg:pl-3 mt-4 lg:mt-0 items-stretch lg:items-end flex-1">
        {/*  Buttons */}
        <div className="mt-2 md:mt-0  flex align-start content-between justify-between lg:justify-end flex-wrap w-100 flex-1">
          {isEditing && (
            <>
              <HeaderButton
                onClick={() => {
                  dispatch(addSection());
                }}
              >
                Add Line
              </HeaderButton>
              <HeaderButton
                onClick={() => {
                  dispatch(clearState());
                }}
              >
                Clear
              </HeaderButton>
              <HeaderButton
                onClick={() => {
                  if (historyIndex > 1) {
                    // Do not go back into initialState
                    dispatch(ActionCreators.undo());
                  }
                }}
              >
                Undo
              </HeaderButton>
              <HeaderButton
                onClick={() => {
                  dispatch(ActionCreators.redo());
                }}
              >
                Redo
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
            </>
          )}
          <HeaderButton
            onClick={() => {
              dispatch(setIsEditing(!isEditing));
            }}
            // className={isEditing ? "" : "ml-auto"}
          >
            {isEditing ? (
              <>
                View Mode
                <Icon className="w-8">
                  <Eye />
                </Icon>
              </>
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
