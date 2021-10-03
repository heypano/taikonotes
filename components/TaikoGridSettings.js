import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setSettings, useSettings } from "../redux/mainSlice";
import { SettingInput } from "./SettingInput";

const numerators = [...Array(20).keys()].map((key) => key + 1);
// export const denominators = [4, 8, 16];

const TaikoGridSettings = ({ sectionId }) => {
  const settings = useSettings(sectionId);
  const dispatch = useDispatch();
  const { cellsPerLine = 16, divideEvery = 4, sounds = "ka,don" } = settings;

  const onFormChange = useCallback(
    (e) => {
      const { name, value, dataType } = e.target;
      const usedValue = dataType === "number" ? Number(value) : value;
      dispatch(
        setSettings({
          sectionId,
          settings: {
            [name]: usedValue,
          },
        })
      );
    },
    [dispatch, sectionId]
  );

  return (
    <form className="flex flex-col ">
      <SettingInput>
        Cells Per Line
        <select
          id={`cellsPerLine_${sectionId}`}
          name={`cellsPerLine_${sectionId}`}
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
          id={`divideEvery_${sectionId}`}
          name={`divideEvery_${sectionId}`}
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
          id={`sounds_${sectionId}`}
          name={`sounds_${sectionId}`}
          className="border-black border p-1 ml-5"
          onChange={onFormChange}
          value={sounds}
        />
      </SettingInput>
    </form>
  );
};

TaikoGridSettings.propTypes = {
  sectionId: PropTypes.number.isRequired,
};

TaikoGridSettings.defaultProps = {};

export default memo(TaikoGridSettings);
