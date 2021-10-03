import React, { memo } from "react";

const PopupCell = ({ className, ...props }) => (
  <div className={`p-3 hover:bg-blue-200 ${className}`} {...props} />
);

export default memo(PopupCell);
