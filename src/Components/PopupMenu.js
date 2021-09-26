import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { onEnter } from "../keyboard/util";

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
      const maxLeft = window.innerWidth - ref.current.clientWidth;
      const maxTop = window.innerHeight - ref.current.clientHeight;
      const usedLeft = Math.max(Math.min(left, maxLeft), minLeft);
      const usedTop = Math.max(Math.min(top, maxTop), minTop);
      setActualPosition({ left: usedLeft, top: usedTop });
    } else {
      setActualPosition(null);
    }
  }, [left, open, top]);

  const visibleClass = actualPosition ? "" : "invisible";
  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  console.debug("PopupMenu rerender");
  return (
    open && (
      <div
        ref={ref}
        className={`popupmenu ${visibleClass} ${className}`}
        style={{ ...style, ...(actualPosition || {}) }}
        onClick={onClick}
        role="button"
        onKeyPress={onEnter(onClick)}
        tabIndex={0}
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
