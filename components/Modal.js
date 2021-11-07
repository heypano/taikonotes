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
  ...PopupMenu.propTypes,
};

Modal.defaultProps = {
  ...PopupMenu.defaultProps,
};

export default Modal;
