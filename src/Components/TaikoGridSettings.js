import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { setSettings, useSettings } from "../redux/mainSlice";

const numerators = [...Array(20).keys()].map((key) => key + 1);
// export const denominators = [4, 8, 16];

const TaikoGridSettings = () => {
  const settings = useSettings();
  const dispatch = useDispatch();
  const { cellsPerLine, divideEvery, sounds } = settings;
  const onSubmit = () => {};
  const onFormChange = (e) => {
    const { name, value, dataType } = e.target;
    const usedValue = dataType === "number" ? Number(value) : value;
    dispatch(
      setSettings({
        [name]: usedValue,
      })
    );
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col ">
      <div className="flex flex-row justify-between">
        <label>Cells Per Line</label>
        <select
          name="cellsPerLine"
          className="p-2 "
          onChange={onFormChange}
          value={cellsPerLine}
          data-data-type="number"
        >
          {numerators.map((key) => (
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
          value={divideEvery}
          data-data-type="number"
        >
          {numerators.map((key) => (
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
          value={sounds}
        />
      </div>
    </form>
  );
};

TaikoGridSettings.propTypes = {};

TaikoGridSettings.defaultProps = {};

export default memo(TaikoGridSettings);
