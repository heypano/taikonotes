import React, { useState } from "react";

const randomColors = true;
const proggressiveColor = true;
let lastC1 = getRandomColorNumber();
let lastC2 = getRandomColorNumber();
let lastC3 = getRandomColorNumber();

const Cell = ({ index, divideEvery, cellsPerLine }) => {
  const [clicked, setClicked] = useState(false);
  const [bg, setBg] = useState("transparent");
  let unclickedClass = "hover:bg-gray-300";
  let clickedClass = "bg-gray-900 hover:bg-gray-600 selected";
  if (index % divideEvery === 0) {
    unclickedClass = "bg-gray-300 hover:bg-gray-600";
  }

  return (
    <div
      className={`border border-blue-800 h-10 cursor-pointer ${
        clicked ? clickedClass : unclickedClass
      }`}
      style={{
        backgroundColor: bg
      }}
      onClick={() => {
        if (randomColors) {
          setBg(getRandomColor());
        }
        if (proggressiveColor) {
          setBg(getProgressiveColor());
        }
        setClicked(!clicked);
      }}
    ></div>
  );
};

function getProgressiveColor() {
  const which = Math.floor(Math.random() * Math.floor(3));
  const c1 = which === 0 ? getNext(lastC1) : lastC1;
  const c2 = which === 1 ? getNext(lastC2) : lastC2;
  const c3 = which === 2 ? getNext(lastC3) : lastC3;
  return `rgb(${c1},${c2},${c3})`;
}

function getRandomColor() {
  const c1 = getRandomColorNumber();
  const c2 = getRandomColorNumber();
  const c3 = getRandomColorNumber();
  return `rgb(${c1},${c2},${c3})`;
}

function getRandomColorNumber() {
  return Math.floor(Math.random() * Math.floor(256));
}

function getNext(num) {
  const result = num + Math.floor(getRandomColorNumber());
  return result % 256;
}

export default Cell;
