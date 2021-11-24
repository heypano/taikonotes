const brightness = "95%";
const saturation = "80%";
export const getListStyle = (isDraggingOver) => ({
  // background: isDraggingOver
  //   ? `hsl(120deg ${saturation} ${brightness})`
  //   : "#eee",
  background: "#eee",
  padding: 10,
});

export const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 10,
  margin: `0 0 10px 0`,

  // change background colour if dragging
  background: isDragging ? `hsl(100deg ${saturation} ${brightness})` : "white",
  boxShadow:
    "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
  // styles we need to apply on draggables
  ...draggableStyle,
});
