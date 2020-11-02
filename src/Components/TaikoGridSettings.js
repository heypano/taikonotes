import React, { useState } from "react";
import { numerators } from "../Data/settings";

const TaikoGridSettings = ({ settings, setSettings }) => {
  const onSubmit = e => {};
  const onFormChange = e => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form
      className="w-full md:w-6/12 lg:w-4/12 border border-blue-300 p-2 flex flex-col justify-center"
      onSubmit={onSubmit}
    >
      <div className="flex flex-row justify-between">
        <label>Cells Per Line</label>
        <select
          name="cellsPerLine"
          className="p-2 "
          onChange={onFormChange}
          value={settings.cellsPerLine}
        >
          {numerators.map(key => (
            <option key={`cellsPerLine_${key}`} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-row justify-between">
        <label>Divide every</label>
        <select
          name="divideEvery"
          className="p-2 "
          onChange={onFormChange}
          value={settings.divideEvery}
        >
          {numerators.map(key => (
            <option key={`defaultDivideEvery_${key}`} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-row justify-between items-end mt-3">
        <label>Available Sounds</label>
        <input
          name="sounds"
          className="border-black border p-1"
          onChange={onFormChange}
          value={settings.sounds}
        />
      </div>
      <div>
        <input type="submit" />
      </div>
    </form>
  );
};
export default TaikoGridSettings;
