import { createPortal } from "react-dom";
import PopupMenu from "./PopupMenu";

function Modal({
  open,
  onOpenChange,
  className,
  style,
  children,
  left,
  top,
}) {
  const portalDom = document.getElementById("modalPortal");
  return (
    portalDom &&
    createPortal(
      <PopupMenu
        {...{ open, onOpenChange, className, style, children, left, top }}
      >
        {children}
      </PopupMenu>,
      portalDom
    )
  );
}

Modal.propTypes = {
  ...PopupMenu.propTypes,
};

Modal.defaultProps = {
  ...PopupMenu.defaultProps,
};

export default Modal;
