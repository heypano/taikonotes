import React, { memo, useRef, useState } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import Button from "./Button";
import Spin from "./Icons/Spin";

const SaveDialog = ({ saveMethod, songslug, error, isSaving, ...rest }) => {
  const songslugInputRef = useRef();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const isNew = !songslug;

  return (
    <Modal {...rest}>
      {isNew && (
        <label htmlFor="song_slug" className="block mb-4">
          <p>What is a short name (slug) for this song? </p>
          <input
            id="save_password"
            className="filter drop-shadow p-1 my-1"
            ref={songslugInputRef}
          />
          <p className="text-sm">This will be used in the URL</p>
        </label>
      )}
      <div className="flex flex-col mb-4">
        <p>
          {songslug ? (
            <>
              What is the <strong>Password</strong> to edit this?
            </>
          ) : (
            <>
              Select a <strong>Password</strong> for editing this song
            </>
          )}
        </p>
        <div className="flex items-center">
          <label htmlFor="save_password">
            <input
              id="save_password"
              className="filter drop-shadow p-1 my-1 mr-2"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <label
            htmlFor="show_password"
            className="text-xs text-gray-700 select-none cursor-pointer"
          >
            Show Password
            <input
              type="checkbox"
              id="show_password"
              className="filter drop-shadow form-checkbox h-4 w-4 ml-2 cursor-pointer"
              onChange={(e) => {
                setShowPassword(e.target.checked);
              }}
              checked={showPassword}
            />
          </label>
        </div>
        {!songslug && (
          <p className="text-sm">
            Please only use passwords you would be comfortable sharing with
            other people
          </p>
        )}
        <div className="flex">
          {isSaving && (
            <div className="w-5 mr-3">
              <Spin />
            </div>
          )}
          {error && (
            <p className="text-sm text-red-500">
              {error === "incorrect_password"
                ? "Incorrect password, try again"
                : error}
            </p>
          )}
        </div>
      </div>
      <Button
        className="p-3 flex items-center justify-between text-left bg-gray-200 hover:bg-gray-300"
        onClick={() =>
          saveMethod({
            password,
            isNew,
            inputSongSlug: songslugInputRef?.current?.value,
          })
        }
      >
        Save
      </Button>
    </Modal>
  );
};

SaveDialog.propTypes = {
  saveMethod: PropTypes.func,
  songslug: PropTypes.string,
  error: PropTypes.string,
  isSaving: PropTypes.bool,
  ...Modal.propTypes,
};

SaveDialog.defaultProps = {
  saveMethod: undefined,
  songslug: undefined,
  error: undefined,
  ...Modal.defaultProps,
};

export default memo(SaveDialog);
