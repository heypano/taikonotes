import React, { useRef } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import Button from "./Button";

const SaveDialog = ({ saveMethod, songslug, ...rest }) => {
  const passwordInputRef = useRef();
  const songslugInputRef = useRef();
  return (
    <Modal {...rest}>
      {!songslug && (
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
      <label htmlFor="save_password" className="block mb-4">
        <p>
          {songslug ? (
            <>
              Select a <strong>Password</strong> for editing this song
            </>
          ) : (
            <>
              What is the <strong>Password</strong> to edit this?
            </>
          )}
        </p>
        <input
          id="save_password"
          className="filter drop-shadow p-1 my-1"
          ref={passwordInputRef}
        />
        {!songslug && (
          <p className="text-sm">
            Please only use passwords you would be comfortable sharing with
            other people
          </p>
        )}
      </label>
      <Button
        className="p-3 flex items-center justify-between text-left bg-gray-200 hover:bg-gray-300"
        onClick={() =>
          saveMethod({
            password: passwordInputRef.current.value,
            songslug: songslugInputRef.current.value,
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
  isSaving: PropTypes.bool,
  ...Modal.propTypes,
};

SaveDialog.defaultProps = {
  saveMethod: undefined,
  songslug: undefined,
  ...Modal.defaultProps,
};

export default SaveDialog;
