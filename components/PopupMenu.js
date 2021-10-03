import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import useOnClickOutside from "../hooks/useOnClickOutside";

const PopupMenu = ({
  open,
  onOpenChange,
  className,
  style,
  children,
  left,
  top,
}) => {
  const ref = useRef();
  const [actualPosition, setActualPosition] = useState();
  const onClickOutside = useCallback(
    (e) => {
      if (open) {
        onOpenChange(false);
        e.stopPropagation();
      }
    },
    [open, onOpenChange]
  );
  useOnClickOutside(ref, onClickOutside);

  useEffect(() => {
    if (ref.current && left !== undefined && top !== undefined) {
      const minLeft = 10;
      const minTop = 10;
      const maxLeft = window.innerWidth - ref.current.clientWidth - 10;
      const maxTop = window.innerHeight - ref.current.clientHeight - 10;
      const usedLeft = Math.max(Math.min(left, maxLeft), minLeft);
      const usedTop = Math.max(Math.min(top, maxTop), minTop);
      setActualPosition({ left: usedLeft, top: usedTop });
    } else {
      setActualPosition(null);
    }
  }, [left, open, top]);

  const visibleClass = actualPosition ? "" : "invisible";

  return (
    open && (
      <div
        ref={ref}
        className={`popupmenu z-10 ${visibleClass} ${className}`}
        style={{ ...style, ...(actualPosition || {}) }}
        role="none"
      >
        {children}
      </div>
    )
  );
};

PopupMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  children: PropTypes.node,
  left: PropTypes.number,
  top: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.shape({}),
};

PopupMenu.defaultProps = {
  className: "",
  style: null,
  children: undefined,
  left: undefined,
  top: undefined,
};

export default PopupMenu;