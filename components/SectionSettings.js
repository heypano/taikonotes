import { useDispatch } from "react-redux";
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
  return (
    <PopupMenu
      open={sectionSettingOpen}
      onOpenChange={(isOpen) => {
        dispatch(setSectionSettingOpen(isOpen));
      }}
      left={sectionSettingCoordinates?.[0]}
      top={sectionSettingCoordinates?.[1]}
      className="grid grid-rows-1 grid-cols-1 w-max max-h-48 p-4"
    >
      <TaikoGridSettings sectionId={sectionSettingSectionId} />
    </PopupMenu>
  );
};

export default SectionSettings;
