export function getCoordinatesFromEvent(e) {
  if (e.clientX && e.clientY) {
    return [e.clientX, e.clientY];
  }
  if (e.target) {
    const { x, y } = e.target.getBoundingClientRect();
    return [x, y];
  }
  return null;
}

export function onEnter(callback) {
  return (e) => {
    if (e.key === "Enter") {
      callback(e);
    }
  };
}

export function onSpace(callback) {
  return (e) => {
    if (e.key === " ") {
      callback(e);
    }
  };
}
