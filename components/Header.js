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
import Notification from "./Notification";
import { setNotification } from "../redux/errorSlice";

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
    <div className="h-48 p-1 mb-3 flex flex-col md:flex-row justify-between items-center">
      <div className="w-full h-full md:w-8/12 lg:w-5/12 flex items-stretch mr-3">
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
        <div className="p-2 mr-4">
          <Image src={TaikoLogo} alt="taiko logo" />
        </div>
        {isEditing ? (
          <textarea
            id="songname"
            aria-label="song name"
            className="text-2xl w-full h-full outline-none p-2 resize-none filter shadow-texty flex-1 mt-2"
            value={title}
            onChange={(e) => {
              dispatch(setSongTitle(e.target.value));
            }}
          />
        ) : (
          <div className="text-2xl w-full h-full outline-none p-2 resize-none filter shadow-texty flex-1 mt-2">
            {title}
          </div>
        )}
      </div>
      <div className="w-full md:w-8/12 lg:w-5/12 flex flex-col justify-between">
        <div className="mt-2 md:mt-0 flex justify-between flex-wrap w-100">
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
