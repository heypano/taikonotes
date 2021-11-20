const brightness = "95%";
const saturation = "50%";
export const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver
    ? `hsl(120deg ${saturation} ${brightness})`
    : "#eee",
  padding: 10,
});

export const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 10,
  margin: `0 0 10px 0`,

  // change background colour if dragging
  background: isDragging ? `hsl(300deg ${saturation} ${brightness})` : "white",

  // styles we need to apply on draggables
  ...draggableStyle,
});
