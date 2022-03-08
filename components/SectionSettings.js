import { useDispatch } from "react-redux";
import { memo, useCallback } from "react";
import PopupMenu from "./PopupMenu";
import TaikoGridSettings from "./TaikoGridSettings";
import {
  setSectionSettingOpen,
  useSectionSettingData,
} from "../redux/editSlice";

const SectionSettings = () => {
  const {
    sectionSettingOpen,
    sectionSettingSectionId,
    sectionSettingCoordinates,
  } = useSectionSettingData();
  const dispatch = useDispatch();
  const onOpenChange = useCallback(
    (isOpen) => {
      dispatch(setSectionSettingOpen(isOpen));
    },
    [dispatch]
  );
  return (
    <PopupMenu
      open={sectionSettingOpen}
      onOpenChange={onOpenChange}
      left={sectionSettingCoordinates?.[0]}
      top={sectionSettingCoordinates?.[1]}
      className="grid grid-rows-1 grid-cols-1 w-max p-4"
    >
      <TaikoGridSettings sectionId={sectionSettingSectionId} />
    </PopupMenu>
  );
};

export default memo(SectionSettings);
