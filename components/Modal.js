import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import PopupMenu from "./PopupMenu";

const Modal = ({ open, onOpenChange, className, style, children, left, top }) =>
  createPortal(
    <PopupMenu
      {...{ open, onOpenChange, className, style, children, left, top }}
    >
      {children}
    </PopupMenu>,
    document.getElementById("modalPortal")
  );

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  children: PropTypes.node,
  left: PropTypes.number,
  top: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

Modal.defaultProps = {
  className: "",
  style: null,
  children: undefined,
  left: undefined,
  top: undefined,
};

export default Modal;
