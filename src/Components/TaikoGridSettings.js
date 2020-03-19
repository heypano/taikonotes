import React from "react";
import {
  defaultSelectedNumerator,
  numerators,
  denominators,
  defaultSelectedDenominator
} from "../Data/settings";

const TaikoGridSettings = props => (
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
          defaultValue={defaultSelectedNumerator}
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
          defaultValue={defaultSelectedDenominator}
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
);

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

export default TaikoGridSettings;
