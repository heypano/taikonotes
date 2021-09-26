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
