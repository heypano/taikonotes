import React, { useState } from "react";
/**
 * React class to Show a Taiko Grid
 */
const TaikoGrid = props => {
  const numCells = 224;
  const cells = [];
  for (let i = 0; i < numCells; i++) {
    cells.push(<Cell key={i} index={i} numCells={numCells}></Cell>);
  }
  const numerators = [...Array(20).keys()].map(key => key + 1);
  const denominators = [4, 8, 16];
  const selectedNumerator = 16;
  const selectedDenominator = 16;

  return (
    <div>
      <div className="container settings mt-3 mb-3 flex flex-row">
        <img
          src={`${process.env.PUBLIC_URL}/favicon/taiko_sakura.svg`}
          className="w-1/12"
        />
        <form
          className="w-2/12 border border-blue-300 p-2 flex flex-col justify-center"
          onChange={onFormChange}
          onSubmit={onSubmit}
        >
          <div className="flex flex-row justify-between">
            <div>
              <label>Numerator</label>
            </div>
            <div>
              <select
                name="numerator"
                className="p-8 w-12"
                defaultValue={selectedNumerator}
              >
                {numerators.map(key => (
                  <option key={`numerator_${key}`} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <label>Denominator</label>
            </div>
            <div>
              <select
                name="denominator"
                className="p-8 w-12"
                defaultValue={selectedDenominator}
              >
                {denominators.map(key => (
                  <option key={`denominator_${key}`} value={key}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
      <div className="grid grid-cols-8 md:grid-cols-16 border border-blue-800">
        {cells}
      </div>
    </div>
  );
};

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

const onFormChange = ({ target: { name, value } }) => {
  console.log(`${name} ${value}`);
  switch (name) {
    case "numerator":
  }
};

const onSubmit = e => {
  e.preventDefault();
  console.log(e.target.elements);
};

export default TaikoGrid;
