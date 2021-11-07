import React, { useRef } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import Button from "./Button";

const SaveDialog = ({
  open,
  onOpenChange,
  className,
  style,
  children,
  left,
  top,
  saveMethod,
}) => {
  const inputRef = useRef();
  return (
    <Modal
      {...{
        open,
        onOpenChange,
        className,
        style,
        children,
        left,
        top,
      }}
    >
      <label
        htmlFor="save_password"
        // className="flex flex-row justify-between items-end mt-3 mr-3 first:mt-0"
      >
        <p>
          Select a <strong>Password</strong> for editing this song:
        </p>
        <input
          id="save_password"
          className="filter drop-shadow p-1 my-1"
          ref={inputRef}
        />
      </label>
      <p className="my-1">
        Please only use passwords you would be comfortable sharing with other
        people
      </p>
      <Button
        className={`p-3 flex items-center justify-between text-left bg-gray-200 hover:bg-gray-300 ${className}`}
        onClick={() => saveMethod({ password: inputRef.current.value })}
      >
        Save
      </Button>
    </Modal>
  );
};

SaveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  children: PropTypes.node,
  left: PropTypes.number,
  top: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  saveMethod: PropTypes.func,
};

SaveDialog.defaultProps = {
  className: "",
  style: null,
  children: undefined,
  left: undefined,
  top: undefined,
  saveMethod: undefined,
};

export default SaveDialog;
