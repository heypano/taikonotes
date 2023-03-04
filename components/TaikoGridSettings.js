import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { setSettings, useSettings } from "../redux/mainSlice";
import { SettingInput } from "./SettingInput";

const numerators = [...Array(32).keys()].map((key) => key + 1);
// export const denominators = [4, 8, 16];

function TaikoGridSettings({ sectionId }) {
  const settings = useSettings(sectionId);
  const dispatch = useDispatch();
  const {
    cellsPerLine = 16,
    divideEvery = 4,
    sounds = "ka,don",
    videoURL,
    titleURL,
  } = settings;

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
    <form
      className="flex flex-col "
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <SettingInput>
        Cells Per Line
        <select
          id={`cellsPerLine_${sectionId}`}
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
          id={`divideEvery_${sectionId}`}
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
          id={`sounds_${sectionId}`}
          name="sounds"
          className="filter drop-shadow p-1 ml-5"
          onChange={onFormChange}
          value={sounds}
        />
      </SettingInput>
      <SettingInput>
        Title URL
        <input
          id={`titleURL_${sectionId}`}
          name="titleURL"
          className="filter drop-shadow p-1 ml-5"
          onChange={onFormChange}
          value={titleURL}
        />
      </SettingInput>

      <SettingInput>
        Video URL
        <input
          id={`videoURL_${sectionId}`}
          name="videoURL"
          className="filter drop-shadow p-1 ml-5"
          onChange={onFormChange}
          value={videoURL}
        />
      </SettingInput>
    </form>
  );
}

TaikoGridSettings.propTypes = {
  sectionId: PropTypes.string.isRequired,
};

TaikoGridSettings.defaultProps = {};

export default memo(TaikoGridSettings);
