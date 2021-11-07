import React from "react";
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
}) => (
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
      <input id="save_password" className="filter drop-shadow p-1" />
    </label>
    <p>
      Please only use passwords you would be comfortable sharing with other
      people
    </p>
    <Button
      className={`p-3 flex items-center justify-between text-left bg-blue-100 hover:bg-blue-50 ${className}`}
      onClick={saveMethod}
    >
      Save
    </Button>
  </Modal>
);

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
