import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setSettings, useSettings } from "../redux/mainSlice";
import { SettingInput } from "./SettingInput";

const numerators = [...Array(20).keys()].map((key) => key + 1);
// export const denominators = [4, 8, 16];

const TaikoGridSettings = () => {
  const settings = useSettings();
  const dispatch = useDispatch();
  const { cellsPerLine, divideEvery, sounds } = settings;
  const onSubmit = () => {};

  const onFormChange = useCallback(
    (e) => {
      const { name, value, dataType } = e.target;
      const usedValue = dataType === "number" ? Number(value) : value;
      dispatch(
        setSettings({
          [name]: usedValue,
        })
      );
    },
    [dispatch]
  );

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col border border-blue-300 p-2"
    >
      <SettingInput>
        Cells Per Line
        <select
          id="cellsPerLine"
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
      </SettingInput>
      <SettingInput>
        Divide every
        <select
          id="divideEvery"
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
      </SettingInput>
      <SettingInput id={sounds}>
        Available Sounds
        <input
          id="sounds"
          name="sounds"
          className="border-black border p-1"
          onChange={onFormChange}
          value={sounds}
        />
      </SettingInput>
    </form>
  );
};

TaikoGridSettings.propTypes = {};

TaikoGridSettings.defaultProps = {};

export default memo(TaikoGridSettings);
