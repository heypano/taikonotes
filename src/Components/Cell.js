import React, { useState } from "react";

const Cell = ({ index, numCells }) => {
  const [clicked, setClicked] = useState(false);
  const signatureDivision = 4;
  let unclickedClass = "hover:bg-gray-300";
  let clickedClass = "bg-gray-900 hover:bg-gray-600 selected";
  if (index % signatureDivision === 0) {
    unclickedClass = "bg-gray-300 hover:bg-gray-600";
  }

  return (
    <div
      className={`border border-blue-800 h-10 cursor-pointer ${
        clicked ? clickedClass : unclickedClass
      }`}
      onClick={() => {
        console.log(clicked);
        setClicked(!clicked);
      }}
    ></div>
  );
};

export default Cell;
