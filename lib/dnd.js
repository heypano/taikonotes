import { taikoLightBrown1, taikoLightBrown2, taikoLightBrown3 } from "./colors";

export const getListStyle = (isDraggingOver) => ({
  // background: isDraggingOver
  //   ? `hsl(120deg ${saturation} ${brightness})`
  //   : "#eee",
  background: taikoLightBrown1,
});

export const getItemStyle = (isDragging, draggableStyle) => ({
  // change background colour if dragging

  background: isDragging ? "white" : "white",
  // boxShadow:
  //   "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
  // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  // styles we need to apply on draggables
  ...draggableStyle,
});
